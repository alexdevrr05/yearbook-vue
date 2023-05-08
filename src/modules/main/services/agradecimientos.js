import apiDB from '@/api/apiDB';

export const postAgradecimientos = async (nombre, text) => {
  try {
    const { data } = await apiDB.post('/agradecimientos', {
      nombre,
      agradecimientos: text,
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
