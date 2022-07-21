const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId}).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = new Job({ ...req.body });
  await job.save();
  res.status(StatusCodes.CREATED).json({
    msg: 'job created',
    job
  })
}

const updateJob = async (req, res) => {
  const { 
    user: { userId }, 
    params: { id: jobId },
    body: { company, position }
  } = req;
  if (company === '' || position === '') {
    throw new BadRequestError('Company or position field cannot be empty')
  }
  const job = await Job.findOne({ _id: jobId });
  console.log(job)
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  job.company = company;
  job.position = position;
  await job.save();
  res.status(StatusCodes.OK).json({
    msg: 'success updated job',
    job,
  })
}

const deleteJob = async (req, res) => {
  res.send('getAllJobs')
}


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}