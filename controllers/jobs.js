const getAllJobs = async (req, res) => {
  res.send('getAllJobs')
}

const getJob = async (req, res) => {
  res.send('get Job')
}

const createJob = async (req, res) => {
  res.send('create Job')
}

const updateJob = async (req, res) => {
  res.send('update Job')
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