import apiDB from '@/api/apiDB';

export const postProjects = async (formData) => {
  try {
    const { data } = await apiDB.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      status: 200,
      msg: data.msg,
    };
  } catch (error) {
    return {
      status: 500,
      msg: error.response.data.msg,
    };
  }
};
