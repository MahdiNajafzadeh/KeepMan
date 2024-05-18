import cron from "node-cron";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async () => {
	const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
	if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
		throw new Error(`EMAIL_USERNAME or EMAIL_PASSWORD not set in ENV`);
	}

	const mail = await nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: EMAIL_USERNAME,
			pass: EMAIL_PASSWORD,
		},
	});

	const job = cron.schedule("* */1 * * *", async () => {
		const now = new Date();
		const reminders = await prisma.reminders.findMany({
			where: {
				expire: {
					lte: now,
				},
			},
			select: {
				id: true,
				note: {
					select: {
						title: true,
						render: true,
					},
				},
				user: {
					select: {
						email: true,
					},
				},
			},
		});
		for (const reminder of reminders) {
			try {
				await mail.sendMail({
					from: EMAIL_USERNAME,
					to: reminder.user.email,
					subject: `Keepman Reminder : ${reminder.note.title}`,
					html: reminder.note.render,
				});
				await prisma.reminders.delete({
					where: {
						id: reminder.id,
					},
				});
			} catch (error) {
				console.log(`Error (job) (reminder) : `, error);
			}
		}
	});

	return job;
};
