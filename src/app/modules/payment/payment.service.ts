import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus, Prisma, UserRole } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelpers";
import { IJWTPayload } from "../../types";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
    console.log("service event here",event);
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as any;

            const appointmentId = session.metadata?.appointmentId;
            const paymentId = session.metadata?.paymentId;

            await prisma.appointment.update({
                where: {
                    id: appointmentId
                },
                data: {
                    paymentStatus: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID
                }
            })
            console.log("update appoinment")
            await prisma.payment.update({
                where: {
                    id: paymentId
                },
                data: {
                    status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
                    paymentGatewayData: session
                }
            })
            console.log("update payment")

            break;
        }

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
};


const getMyAppointment = async (user: IJWTPayload, filters: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { ...filterData } = filters;

    const andConditions: Prisma.AppointmentWhereInput[] = [];

    if (user.role === UserRole.PATIENT) {
        andConditions.push({
            patient: {
                email: user.email
            }
        })
    }
    else if (user.role === UserRole.DOCTOR) {
        andConditions.push({
            doctor: {
                email: user.email
            }
        })
    }

    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map(key => ({
            [key]: {
                equals: (filterData as any)[key]
            }
        }))

        andConditions.push(...filterConditions)
    }

    const whereConditions: Prisma.AppointmentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.appointment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: user.role === UserRole.DOCTOR ?
            { patient: true } : { doctor: true }
    });

    const total = await prisma.appointment.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            limit,
            page
        },
        data: result
    }

}
export const PaymentService = {
    handleStripeWebhookEvent,
    getMyAppointment
}