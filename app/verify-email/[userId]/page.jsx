import OTPForm from "./Otp";

export default async function Page({ params }) {
  const { userId } = await params;
  console.log(userId);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <OTPForm userId={userId} />
    </div>
  );
}
