import apiDB from '@/api/apiDB';

export const postAgradecimientos = async (nombre, text, userImage, email) => {
  try {
    const { data } = await apiDB.post('/agradecimientos', {
      nombre,
      agradecimientos: text,
      userImage,
      email,
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
