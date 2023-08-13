const Protected = () => {
  return (
    <div className="min-h-screen bg-[url('https://img.lovepik.com/background/20211021/large/lovepik-cool-line-technology-banner-background-image_400112106.jpg')] bg-cover flex flex-col gap-8 text-center justify-center pt-20 text-white">
      <div className="md:p-16 p-5 m-10 backdrop-blur-sm border-[1px]">
        <h1 className="text-6xl">Protected Route</h1>
        <p className="mt-6 text-xl text-blue-400 mb-3 underline">
          Features Completed
        </p>
        <ul>
          <li>Create a registration ✔️</li>
          <li>Create Login form ✔️</li>
          <li>Basic Form Validation ✔️</li>
          <li>Store token in local localStorage after successfull login ✔️</li>
          <li>
            Created a protected route and can only be accessed when loged in ✔️
          </li>
          <li>
            Displayed message for successfull login, registration or fail ✔️
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Protected;
