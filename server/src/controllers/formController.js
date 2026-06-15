import { validationResult } from 'express-validator';
import FormModel from '../models/formModel.js';

export const submitForm = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }

  const { fullName, email, password, phone, dob, gender } = req.body;

  if (FormModel.findByEmail(email)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const profilePicture = req.file ? req.file.filename : null;

  const record = FormModel.create({ fullName, email, password, phone, dob, gender, profilePicture });

  return res.status(201).json({
    success: true,
    message: 'Registration successful!',
    data: { id: record.id, fullName: record.fullName, email: record.email },
  });
};

export const getData = (_req, res) => {
  const all = FormModel.findAll().map(({ password, ...rest }) => rest); // omit passwords
  return res.status(200).json({ success: true, count: all.length, data: all });
};
