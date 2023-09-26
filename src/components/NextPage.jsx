import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import euro from "../assets/euro.png";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
// const excelData = [
//   {
//     id: 1,
//     brand: "Tefal",
//     name: "toaster",
//     link: "https://stackoverflow.com/questions/72111794/excel-xlsx-library-sheetjs-is-undefined-after-import",
//     price: "$65.2",
//     discount: "$55.5",
//   },
//   {
//     id: 2,
//     brand: "Tefal",
//     name: "wasserkocher",
//     link: "https://stackoverflow.com/questions/72111794/excel-xlsx-library-sheetjs-is-undefined-after-import",
//     price: "$45.6",
//     discount: "$40.0",
//   },
//   {
//     id: 3,
//     brand: "Emsa",
//     name: "trinka",
//     link: "https://stackoverflow.com/questions/72111794/excel-xlsx-library-sheetjs-is-undefined-after-import",
//     price: "$05.6",
//     discount: "$00.0",
//   },
//   {
//     id: 4,
//     brand: "Emsa",
//     name: "haarstyling-haartrocker",
//     link: "https://stackoverflow.com/questions/72111794/excel-xlsx-library-sheetjs-is-undefined-after-import",
//     price: "$77.2",
//     discount: "$70.0",
//   },
// ];

const NextPage = ({ products }) => {
  const [search, setSearch] = useState("");

  let excelProducts = products.flat();

  console.log(search.toLowerCase());

  const exportHandler = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelProducts);

    XLSX.utils.book_append_sheet(wb, ws, "Staturn");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  return (
    <div className="p-20">
      <Link to='/' className="py-4 px-4 inline-block cursor-pointer bg-blue-600 rounded-md text-white font-bold hover:scale-90 transition-all duration-300">
        <IoChevronBackCircleSharp size='25'/>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-[#000] text-3xl font-medium">Products</p>
        <button
          onClick={exportHandler}
          className="py-4 px-10 bg-blue-600 rounded-md text-white font-bold hover:scale-90 transition-all duration-300"
        >
          Export Excel
        </button>
      </div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full py-3 pl-3 border-2 my-5 outline-none rounded-md hover:border-blue-500 active:border-blue-500 focus:border-blue-500"
        placeholder="Filter brands..."
        // onChange={(prev)=> setFilter(prev)}
      />
      <div>
        <table className="w-full table text-center  ">
          <thead>
            <tr className="font-bold bg-slate-100 ">
              <td>Retailer</td>
              <td className="py-3 capitalize">article_number</td>
              <td>Brand</td>
              <td>Name</td>
              <td>Category</td>
              <td>Available</td>
              <td>Url</td>
              <td>Uvp</td>
              <td>Vp</td>
            </tr>
          </thead>
          <tbody>
            {products?.map((data, idx) =>
              data
                ?.filter((data) => {
                  return search.toLowerCase() == "" ? data : (data?.name.toLowerCase().includes(search.toLowerCase()) ||  data?.brand.toLowerCase().includes(search.toLowerCase())) ;
                })
                .map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{data?.retailer}</td>
                      <td>{data?.article_number}</td>
                      <td>{data?.brand}</td>
                      <td>{data?.name}</td>
                      <td>{data?.category}</td>
                      <td>{data?.available}</td>
                      <td>
                        <a href={data.url} target="_blank">
                          more info
                        </a>
                      </td>
                      <td className="">
                        <div className="flex items-center gap-1 px-1">
                          {data?.uvp}{" "}
                          <img
                            src={euro}
                            alt=""
                            className="h-[10px] w-[10px]"
                          />{" "}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 px-1x">
                          {data?.vp}{" "}
                          <img
                            src={euro}
                            alt=""
                            className="h-[10px] w-[10px]"
                          />{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NextPage;
