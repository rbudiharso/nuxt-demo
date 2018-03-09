import { Router } from 'express'
import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'

const router = Router()

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })
})

router.post('/', function (req, res, next) {
  const { name, phone, email, address } = req.body
  transporter.sendMail({
    from: 'noreply@giftcard.co.id',
    to: 'partners@usetada.com',
    subject: 'New Partner Submission',
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Address: ${address}
    `
  }, (err, info) => {
    console.error(err)
    console.log(info)
    res.sendStatus(200)
  })
})

export default router
