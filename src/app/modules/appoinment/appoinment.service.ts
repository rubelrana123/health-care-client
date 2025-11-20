import { prisma } from "../../shared/prisma";
 
import { v4 as uuidv4 } from 'uuid';
import { IJWTPayload } from "../../types";
import stripe from "../../helpers/stripe";

const createAppointment = async (
  user: IJWTPayload,
  payload: { doctorId: string; scheduleId: string }
) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
      isDeleted: false,
    },
  });

  // Check if schedule is free
  const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: payload.doctorId,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId = uuidv4();

  const result = await prisma.$transaction(async (tnx) => {
    // 1. Create appointment record
    const appointmentData = await tnx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
    });

    // 2. Mark schedule as booked
    await tnx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
      },
    });

    // 3. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(doctorData.appointmentFee) * 100, // cents
      currency: "usd",
      metadata: {
        appointmentId: appointmentData.id,
      },
    });

    // 4. Create pending payment record
    await tnx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId: paymentIntent.id, // use PaymentIntent ID
        status: "PENDING",
      },
    });

    return {
      appointment: appointmentData,
      clientSecret: paymentIntent.client_secret,
    };
  });

  return result;
};

export const AppointmentService = {
    createAppointment,
};