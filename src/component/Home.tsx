import React, {useEffect, useState} from 'react';
import * as tokenService from "../service/tokenService";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area, AreaChart, BarChart, Bar, Rectangle
} from 'recharts';


interface Token {
    id: string;
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
    idTime: number; // Preserving idTime in Token
}

interface Time {
    name: string;
    close: number;
    idTime: number; // Added idTime to match Token idTime for filtering
}

function Home() {
    const [tokenList, setTokenList] = useState<Token[]>([]);
    const [timeSeries, setTimeSeries] = useState<Time[]>([]);
    const [noResults, setNoResults] = useState(false);
    const [number, setNumber] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTokens = tokenList.slice(indexOfFirstItem, indexOfLastItem);


    const handleNextPage = () => {
        if (indexOfLastItem < tokenList.length) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    console.log(noResults)
    useEffect(() => {
        const fetchTokenList = async () => {
            try {
                const res = await tokenService.findByAll();
                if (res && res.data && res.data.length === 0) {
                    setNoResults(true);
                } else if (res && res.data) {
                    setTokenList(res.data);
                }
            } catch (error) {
                console.error('Error fetching token list:', error);
            }
        };

        fetchTokenList();
    }, []);

    useEffect(() => {
        const fetchTimeSeriesList = async () => {
            try {
                const res = await tokenService.findByAllTime();

                if (res && res.data && res.data.length > 0) {
                    const data = res.data[number];
                    console.log(data[number], '================================');

                    if (data.time) {
                        const transformedData = Object.keys(data.time).map((key) => {
                            const item = data.time[key];
                            const dateTime = new Date();
                            const formattedTime = dateTime.toISOString().split('T')[1].split('.')[0]; // Get time
                            return {
                                name: formattedTime,
                                close: parseFloat(item["4. close"]),
                                idTime: data.idTime,
                            };
                        });

                        if (transformedData.length === 0) {
                            setNoResults(true);
                        } else {
                            setTimeSeries(transformedData);
                        }
                    } else {
                        setNoResults(true);
                    }
                } else {
                    setNoResults(true);
                }
            } catch (error) {
                console.error('Error fetching token list:', error);
                setNoResults(true);
            }
        };

        fetchTimeSeriesList();
    }, [number]);

    const [ticker, setTicker] = useState<string>('PRFX');
    const [price, setPrice] = useState<string>('11.16');
    const [volume, setVolume] = useState<string>('94504971');

    function handleRowClick(token: Token) {
        setTicker(token.ticker);
        setPrice(token.price);
        setVolume(token.volume);
        setNumber(token.idTime);

        // Filter timeSeries based on idTime
        const filteredTimeSeries = timeSeries.filter(
            (series) => series.idTime === token.idTime
        );

        setTimeSeries(filteredTimeSeries);
        console.log(number)// Update the timeSeries state based on idTime
    }


    return (
        <div>
            <div className="container mx-auto p-6 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Uniswap Overview</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">{ticker}</h2>
                        <p className="text-4xl font-bold mb-4">{price}</p>
                        <div className="relative h-48  rounded">
                            <ResponsiveContainer width="100%" height="100%">

                                <AreaChart
                                    width={700}
                                    height={700}
                                    data={timeSeries} // Dữ liệu đã được lọc
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e91e63" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#e91e63" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>

                                    <XAxis dataKey="name" hide/>
                                    <YAxis hide/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="close" stroke="#ff0000" fill="url(#colorValue)"/>
                                </AreaChart>
                            </ResponsiveContainer>


                        </div>
                        {/*<p className="mt-2 text-sm text-gray-400">May 2020 - 2023</p>*/}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Volume 24H</h2>
                        <p className="text-4xl font-bold mb-4">${volume}</p>
                        <div className="relative h-48 rounded">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={timeSeries}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="name" hide/>
                                    <YAxis/>
                                    <Tooltip/>

                                    <Bar dataKey="close" fill="#00ffff"
                                         activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 my-2">
                    <p className="ms-5">
                        Volume 24H: $860.60m (↓39.33%) Fees 24H: $2.45m (↓15.75%) TVL: $5.32b (↑0.34%)
                    </p>
                </div>

                <div>
                    Top Tokens
                </div>
                <table className='bg-gray-800 table-auto w-full container text-left'>

                    <thead>
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Price Change</th>
                        <th className="px-4 py-2">Volume 24H</th>
                        <th className="px-4 py-2">TVL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentTokens.map((token, index) => (
                        <tr key={index} onClick={() => handleRowClick(token)}
                            className="cursor-pointer hover:bg-gray-100">
                            <td className="px-4 py-2">{++index}</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-gray-700 mr-2"></div>
                                    <span>{token.ticker}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">{token.price}$</td>
                            <td className="px-4 py-2 text-green-500">↑0.34%</td>
                            <td className="px-4 py-2">${token.volume}</td>
                            <td className="px-4 py-2">$2.19b</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-gray-600 px-4 py-2 rounded text-white"
                    >
                        Previous
                    </button>
                    <span className='mx-2'>
                        Page {currentPage} of {Math.ceil(tokenList.length / itemsPerPage)}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={indexOfLastItem >= tokenList.length}
                        className="bg-gray-600 px-4 py-2 rounded text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;