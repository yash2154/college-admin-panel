import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    const toastLogout = toast.loading("logging out");
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PORT + "/api/admin/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("admin");
      setAuthUser(null);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      router.push("/login");
    } finally {
      setLoading(false);
      toast.dismiss(toastLogout);
    }
  };
  return { loading, logout };
};
export default useLogout;
