import { getDetailService } from '@/shared/apis/serviceService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    fetchDoctorsByService,
    selectDoctor
} from '@/shared/stores/doctorSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import ExaminationSchedule from '../components/ExaminationSchedule';
import Loading from '@/shared/pages/Loading';
import { useTranslation } from 'react-i18next';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DoctorService() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();
    const serviceId = params.id;
    const [dataDetail, setDataDetail] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const { listDoctorService, loading } = useAppSelector(selectDoctor);

    useEffect(() => {
        setIsLoading(true);
        getDetailService(Number(serviceId))
            .then((res) => {
                setDataDetail(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [serviceId]);

    useEffect(() => {
        dispatch(
            fetchDoctorsByService({
                serviceId: Number(serviceId),
                page: 1,
                limit: 10,
                status: 'active'
            })
        );
    }, [dispatch]);

    return loading || isLoading ? (
        <Loading />
    ) : (
        <div
            className={`
                flex flex-col px-3 sm:px-4 lg:px-20 w-full py-5 my-5
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <div className='flex items-center gap-1 flex-wrap text-sm sm:text-base'>
                <AiOutlineHome
                    className='text-lg sm:text-xl cursor-pointer text-blue-500'
                    onClick={() => navigate('/')}
                />
                <IoIosArrowForward className='shrink-0' />
                <span className='text-blue-500 cursor-pointer whitespace-nowrap'>
                    {t('bookingAppointment.sv')}
                </span>

                <IoIosArrowForward className='shrink-0' />
                <span className='line-clamp-1 break-all'>
                    {dataDetail?.name || 'No data'}
                </span>
            </div>

            <div className='flex flex-col gap-3 sm:gap-5 border border-gray-200 p-3 sm:p-5 mt-4 sm:mt-5 rounded-none'>
                <h1 className='text-xl sm:text-3xl font-bold text-center'>
                    {dataDetail?.name || 'No data'}
                </h1>
                <p className='text-gray-500 text-center text-sm sm:text-base'>
                    {dataDetail?.description || 'No data'}
                </p>
                <p className='text-center text-sm sm:text-base'>
                    {t('bookingAppointment.tl')}:{' '}
                    <span className='font-semibold'>
                        {dataDetail?.durationMinutes}
                    </span>{' '}
                    {t('bookingAppointment.ph')}
                </p>
            </div>

            <div className='border border-gray-200 p-3 sm:p-5 mt-5 rounded-none'>
                <h1 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-0'>
                    {t('bookingAppointment.dsbs')}
                </h1>
                {listDoctorService.length > 0
                    ? listDoctorService.map((doctor, index) => (
                          <div
                              className='flex flex-col border border-blue-500 p-3 sm:p-5 mt-5 rounded-none shadow-sm'
                              key={index}
                          >
                              <div className='flex flex-col sm:flex-row gap-4 sm:gap-10'>
                                  <img
                                      src={
                                          BACKEND_URL + doctor?.doctor?.image ||
                                          'No data'
                                      }
                                      alt=''
                                      className='w-full h-56 sm:w-40 sm:h-40 object-cover rounded-none shrink-0'
                                  />
                                  <div className='flex-1'>
                                      <p className='text-gray-500 text-sm sm:text-base'>
                                          {t('bookingAppointment.bs')}:{' '}
                                          <span className='text-black font-semibold'>
                                              {doctor?.doctor?.user?.name}
                                          </span>
                                      </p>
                                      <span className='text-gray-500 text-sm sm:text-base block mt-1'>
                                          {t('bookingAppointment.gi')}:{' '}
                                          <span className='text-black font-semibold'>
                                              {doctor?.price?.toLocaleString()}{' '}
                                              VND
                                          </span>
                                      </span>
                                      <p className='text-gray-500 mt-2 text-sm sm:text-base line-clamp-3 sm:line-clamp-none'>
                                          {doctor?.doctor?.introduce}
                                      </p>
                                  </div>
                              </div>

                              <div className='mt-4 sm:mt-5 w-full overflow-x-auto'>
                                  <ExaminationSchedule
                                      doctorId={Number(doctor?.doctor?.id)}
                                      degree={
                                          listDoctorService[0]?.doctor
                                              ?.degree || 'No data'
                                      }
                                      doctorName={
                                          doctor?.doctor?.user?.name ||
                                          'No data'
                                      }
                                      specialty={
                                          doctor?.doctor?.specialty?.name ||
                                          'No data'
                                      }
                                      price={doctor?.doctor?.price || 0}
                                      service={true}
                                      serviceId={Number(serviceId) || 0}
                                      serviceName={
                                          dataDetail?.name || 'No data'
                                      }
                                      durationMinutes={
                                          dataDetail?.durationMinutes || 0
                                      }
                                      image={doctor?.doctor?.image || 'No data'}
                                  />
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
