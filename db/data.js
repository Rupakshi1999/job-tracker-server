const jobs__filter = (req) => {
  const { search, liked, stage, resume, coverLetter } = req.query;
  const queryObject = {};
  queryObject.createdBy = req.user.userID;

  if (liked) {
    queryObject.liked = liked === 'true' ? true : false;
  }
  if (search) {
    queryObject.title = {
      $regex: search,
      $options: 'i',
    };
  }

  if (stage) {
    queryObject.stage = stage;
  }

  if (resume) {
    queryObject.resume = resume;
  }

  if (coverLetter) {
    queryObject.coverLetter = coverLetter;
  }

  return queryObject;
};

const sort_jobs = (query) => {
  const { sort } = query;
  if (sort) {
    const sortList = sort.split(',').join(' ');
    return sortList;
  } else {
    return '-createdAt';
  }
};

const get_specified_fields = (query) => {
  const { fields } = query;
  if (fields) {
    const porpertyList = fields.split(',').join(' ');
    return porpertyList;
  }
};

module.exports = {
  jobs__filter,
  sort_jobs,
  get_specified_fields,
};
