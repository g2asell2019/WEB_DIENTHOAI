import useFetch from "../../component/payment/FetchStatus";


const paramsToString = (params) => {
  return Object.entries(params)
    .map(entry => {
      return `${entry[0]}=${entry[1]}`;
    }).join('&');
}

export const VNPayStatus = () => {
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());
  const queryString = paramsToString(params);

  const { data, isPending, error } = useFetch('http://localhost:8080/vnpay/vnpay_return?' + queryString);

  return (
    <>
      <div className="container">
        <div className="mb-3 text-center">
          {
            error && (
              <p className="text-center text-red-500 text-3xl">{error}</p>
            )
          }
          {
            isPending && (
              <p className="text-center text-3xl">Đang tải kết quả giao dịch...</p>
            )
          }
          {
            !isPending && data && (
              <>
                {/* <h1 className="text-center text-red-500 mb-3">{data.status}</h1> */}
                <h1 className="text-center text-red-500 mb-3">{data.message}</h1>
                <br></br>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

