useEffect(() => {
  const verifyUserEmail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`
      );

      toast.success(res.data.message || "Email verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (token) verifyUserEmail();
}, [token]);
