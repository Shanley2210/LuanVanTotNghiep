import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import ExaminationSchedule from '../components/ExaminationSchedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { getDetailDoctor } from '@/shared/apis/doctorService';
import NotFound from '@/shared/pages/NotFound';
import Loading from '@/shared/pages/Loading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DoctorDetail() {
    const params = useParams();
    const { id } = params;
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [dataDetail, setDataDetail] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const detailDoctor = async () => {
        setIsLoading(true);
        try {
            const res = await getDetailDoctor(Number(id));

            setDataDetail(res.data.data);
        } catch (e: any) {
            console.log('Error detail doctor:', e);
            toast.error(
                language === 'vi' ? 'Lỗi phí Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            detailDoctor();
        }
    }, [id]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : !dataDetail ? null : dataDetail.status !== 'active' ? (
                <NotFound />
            ) : (
                <div
                    className={`
                flex flex-col px-4 lg:px-20 w-screen py-5 my-5
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
                >
                    <div className='flex items-center gap-1'>
                        <AiOutlineHome
                            className='text-xl cursor-pointer text-blue-500'
                            onClick={() => navigate('/')}
                        />
                        <IoIosArrowForward />
                        <span className='text-blue-500 cursor-pointer'>
                            {t('detalDoctor.dt')}
                        </span>
                        <IoIosArrowForward />
                        <span className='line-clamp-1'>
                            {dataDetail?.user?.name || 'No data'}
                        </span>
                    </div>

                    <div className='border border-gray-200 p-5 mt-5 flex flex-col md:flex-row justify-between gap-5'>
                        <div className='flex gap-4 md:gap-10 w-full md:w-2/5'>
                            <img
                                src={
                                    BACKEND_URL + dataDetail?.image || 'No data'
                                }
                                alt={dataDetail?.user?.name || 'No data'}
                                className='w-24 h-24 md:w-32 md:h-32 object-cover rounded'
                            />

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col md:flex-row gap-1 md:gap-2 md:items-center'>
                                    <span>{t('detalDoctor.dt')}</span>
                                    <span className='text-xl md:text-2xl font-bold'>
                                        {dataDetail?.user?.name || 'No data'}
                                    </span>
                                </div>

                                <div className='flex gap-1'>
                                    <span className='text-gray-500'>
                                        {t('detalDoctor.bc')}
                                    </span>
                                    <span className='font-semibold'>
                                        {dataDetail?.degree || 'No data'}
                                    </span>
                                </div>

                                <div className='flex gap-1'>
                                    <span className='text-gray-500'>
                                        {t('detalDoctor.ck')}
                                    </span>
                                    <span className='font-semibold'>
                                        {dataDetail?.specialty?.name ||
                                            'No data'}
                                    </span>
                                </div>

                                <div className='flex gap-1'>
                                    <span className='text-gray-500'>
                                        {t('detalDoctor.ro')}
                                    </span>
                                    <span className='font-semibold'>
                                        {dataDetail?.room || 'No data'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-3/5 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100'>
                            <div>
                                <span className='text-blue-500 uppercase font-bold'>
                                    {t('detalDoctor.dc')}
                                </span>
                                <p className='mt-1'>
                                    123 Đường ABC, Quận XYZ, TP.HCM
                                </p>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-blue-500 uppercase font-bold'>
                                    {t('detalDoctor.pr')}
                                </span>
                                <span className='font-semibold mt-1'>
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(
                                        dataDetail?.price
                                            ? dataDetail?.price
                                            : 0
                                    )}
                                </span>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {t('detalDoctor.subPr')}
                                </p>
                                <p className='text-sm mt-1'>
                                    {t('detalDoctor.mt')}
                                </p>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-blue-500 uppercase font-bold'>
                                    {t('detalDoctor.bh')}
                                </span>
                                <span className='mt-1'>
                                    {t('detalDoctor.nhnn')}
                                </span>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {t('detalDoctor.subBh')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <ExaminationSchedule
                        doctorId={Number(id)}
                        degree={dataDetail?.degree || 'No data'}
                        doctorName={dataDetail?.user?.name || 'No data'}
                        specialty={dataDetail?.specialty?.name || 'No data'}
                        price={dataDetail?.price || 0}
                    />

                    <div className='w-full'>
                        <Tabs
                            defaultValue='1'
                            className='w-full border border-gray-200 p-5'
                        >
                            <TabsList className='w-full justify-start bg-transparent p-0 border-b border-gray-200 h-auto rounded-none'>
                                <TabsTrigger
                                    value='1'
                                    className='cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:shadow-none'
                                >
                                    {t('detalDoctor.int')}
                                </TabsTrigger>
                                <TabsTrigger
                                    value='2'
                                    className='cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:shadow-none'
                                >
                                    {t('detalDoctor.exp')}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value='1' className='pt-5'>
                                <Card className='border-none shadow-none'>
                                    <CardContent className='grid gap-6 px-0'>
                                        <div
                                            className='grid gap-3 text-justify [&>ul]:list-disc [&>ul]:pl-5'
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    dataDetail?.introduce ||
                                                    'No data'
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value='2' className='pt-5'>
                                <Card className='border-none shadow-none'>
                                    <CardContent className='grid gap-6 px-0'>
                                        <div
                                            className='grid gap-3 text-justify [&>ul]:list-disc [&>ul]:pl-5'
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    dataDetail?.workExperience ||
                                                    'No data'
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    );
}
