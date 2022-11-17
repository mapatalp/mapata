const useAuth = () => {
  const handleResponse = ({ response, handlerFunction, method }) => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (method === "google") {
        googleAuthentication();
      }
    }
  };

  const googleAuthentication = () => {};

  return {
    handleResponse,
  };
};

export default useAuth;
