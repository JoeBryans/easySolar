import React from "react";

export const EmailTemplate = async ({ name, verifyToken }) => {
  // ;
  console.log("name", name);
  console.log("verifyToken", verifyToken);

  // const userId = await params.userId;
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="w-[400px] h-96 bg-white flex flex-col items-center gap-5  p-4  rounded-md shadow-md mx-auto">
        <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-purple-400 bg-clip-text text-xl font-bold">
          easySolar
        </span>
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={"/logo.png"}
            alt="profile"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold">Hi {name}</h1>

        <h1 className="text-2xl font-bold">Please verify your email</h1>
        <div className="w-full flex gap-5 flex-col items-center">
          <span>{verifyToken}</span>

          <p>
            You&apos;re receiving this email because you have an account in
            easySolar. If you are not sure why you&apos;re receiving this,
            please contact us by replying to this email.
          </p>
        </div>
      </div>
    </div>
  );
};
