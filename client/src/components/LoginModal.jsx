import { Loader, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { API } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";

function LoginModal({ open, setOpen, setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      if (res.data) {
        localStorage.setItem("airhomeUser", JSON.stringify(res.data));
        navigate("/");
        window.location.reload();

        setLoading(false);
        setEmail("");
        setPassword("");
        setError("");
        setOpen(!open);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        centered
        title="Log into your account"
        size={"lg"}
      >
        <div className="flex flex-col">
          <span className="text-xl text-black">Welcome back!</span>
          <span className="text-sm text-gray-600">
            Log in to access your account.
          </span>
        </div>
        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {error && <span className="text-sm text-red-500">{error}</span>}
          <TextInput
            label="Email address"
            placeholder="your_email_address"
            type="email"
            size="md"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="your_password"
            type="password"
            size="md"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="h-10 bg-primary text-white font-light rounded-lg mt-2 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader size={"sm"} color="white" /> : "Log in"}
          </button>
          <span className="text-sm mt-1">
            First time using Airhome?{" "}
            <span
              className="text-primary ml-1 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setRegister(true);
              }}
            >
              Sign up!
            </span>
          </span>
        </form>
      </Modal>
    </>
  );
}

export default LoginModal;
