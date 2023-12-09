exports.getLandingPage = (req, res, next) => {
  res.status(200).render("landingPage", {
    title: "JobTracker",
  });
};

exports.getAccountPage = (req, res, next) => {
  res.status(200).render("account", {
    title: "account",
  });
};

exports.addInterviewsPage = (req, res, next) => {
  res.status(200).render("addInterview", {
    title: "Add Interview",
  });
};

exports.getAddJobPage = (req, res, next) => {
  res.status(200).render("addJob", {
    title: "Add Job",
  });
};

exports.getInterviewPage = (req, res, next) => {
  res.status(200).render("interview", {
    title: "Interview",
  });
};

exports.getJob = (req, res, next) => {
  res.status(200).render("job", {
    title: "Job",
  });
};

exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

exports.getJobsOverview = (req, res, next) => {
  res.status(200).render("jobsOverview", {
    title: "Jobs Overview",
  });
};

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signUp", {
    title: "Sign Up",
  });
};
