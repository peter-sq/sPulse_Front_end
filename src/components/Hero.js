import React, {useEffect, useState} from 'react'
import axios from 'axios';



const Hero = () => {

    const [DailyPrediction, setDailyPrediction] = useState([]);

    useEffect(() => {
        //fetch prediction data from the Api
        const predictionData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/all-games`)
                setDailyPrediction(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error Fetching data', error) 
            }
        }
        predictionData();
    }, []);



    return (
        <section className="mt-24 mb-24 max-w-full mx-auto px-4 md:px-8 bg-green">
            <div>
                <h1 className="text-gray-800 text-3xl font-semibold">
                    We are the Best Soccer Prediction Site
                </h1>
            </div>

            <ul className="mt-12 space-y-6">
                {DailyPrediction.map((item) => (
                    <li key={item._id} className="p-5 bg-white rounded-[1rem] shadow-sm">
                        <div>
                            <div className="justify-between sm:flex">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold"> {new Date(item.date).toLocaleDateString('en-GB')}</h2>
                                </div>
                            </div>
                            <div className="mt-4 items-center space-y-4 text-sm  sm:space-x-4 sm:space-y-0">
                                        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                                    <table className="w-full table-auto text-sm text-left">
                                        <thead className=" bg-red text-gray-600 font-medium border-b">
                                            <tr>
                                                <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Time</th>
                                                <th className="px-6 py-3 bg-gray-50  text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Fixtures</th>
                                                <th className="px-6 py-3 bg-gray-50  text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Odds</th>
                                                <th className="px-6 py-3 bg-gray-50  text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Prediction</th>
                                                <th className="px-6 py-3 bg-gray-50  text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Result</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-600">
                                            {item.predictions.map((prediction) => (
                                                <tr key={prediction._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[16px] capitalize  font-Roboto text-gray-500">{prediction.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[16px] capitalize  font-Roboto text-gray-500">{prediction.fixtures}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[16px] capitalize  font-Roboto text-gray-500">{prediction.odds}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[16px] capitalize  font-Roboto text-gray-500">{prediction.prediction}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[16px] capitalize font-Roboto text-gray-500">{prediction.result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Hero;

