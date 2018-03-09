import { Router } from 'express'

import mailer from './mailer'

const router = Router()

router.use('/mailer', mailer)

export default router
