import { Button, TextInput } from "flowbite-react";
import { type NextPage } from "next";
import { useState } from "react";
import { api } from "../utils/api";
import { PhoneInput } from "react-international-phone";
import CustomPhoneInput from "../components/CustomPhoneInput";

const Home: NextPage = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [hash, setHash] = useState("");
  const sendCode = api.example.sendCode.useMutation();
  const signIn = api.example.signIn.useMutation();
  const handleCodeSend = async () => {
    const hash = await sendCode.mutateAsync({ phone: phone });
    setHash(hash);
  };
  const handleAuth = () => {
    signIn.mutateAsync({ phone: phone, phoneCode: code, phoneCodeHash: hash });
  };
  return (
    <div className="absolute grid h-full w-full place-items-center">
      {!hash ? (
        <form onSubmit={handleCodeSend} className="flex w-56 flex-col gap-5">
          <CustomPhoneInput value={phone} onChange={setPhone} />
          <Button type="submit">Send</Button>
        </form>
      ) : (
        <form onSubmit={handleAuth} className="flex w-1/5 flex-col gap-5">
          <TextInput
            id="phone"
            type="text"
            sizing="md"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <Button type="submit">send</Button>
        </form>
      )}
    </div>
  );
};

export default Home;
