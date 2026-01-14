import { Button } from '@/components/ui/button';
import { paymentVNPAYDetail } from '@/shared/apis/patientService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Loading from '@/shared/pages/Loading';
import {
  Download,
  ExternalLink,
  Printer,
  XCircle,
  CheckCircle,
  Home
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentReturn() {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status');
  const txnRef = searchParams.get('txnRef');

  const [transactionData, setTransactionData] = useState<any>(null);
  const [isAppointment, setIsAppointment] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        if (status !== 'success') {
          setError(
            t('PaymentReturn.status_failed') ||
              'Thanh toán thất bại hoặc bị hủy'
          );
          setIsLoading(false);
          return;
        }

        if (!txnRef) {
          setError(t('PaymentReturn.invalid_param') || 'Thiếu mã giao dịch');
          setIsLoading(false);
          return;
        }

        const res = await paymentVNPAYDetail(txnRef);

        if (res && res.data && res.data.errCode === 0) {
          const p = res.data.data;

          setTransactionData({
            orderId: p.appointmentId ? `${p.appointmentId}` : `${p.recordId}`,
            transactionId: p.txnRef,
            amount: new Intl.NumberFormat('vi-VN').format(p.amount) + ' VNĐ',
            method: 'VNPay',
            status:
              p.status === 'success'
                ? t('PaymentReturn.status_success')
                : t('PaymentReturn.status_failed'),
            date: new Date(p.createdAt).toLocaleString('vi-VN'),
            customer: p.appointment?.patientName ?? ''
          });

          setIsAppointment(!!p.appointment);
        } else {
          setError(
            res.data?.errViMessage || t('PaymentReturn.transaction_not_found')
          );
        }
      } catch (e) {
        console.error('Error fetching payment:', e);
        setError(t('PaymentReturn.server_error') || 'Lỗi kết nối máy chủ');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [status, txnRef, t]);

  if (isLoading) return <Loading />;

  if (error || !transactionData) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        <div className='flex flex-col items-center gap-2'>
          <XCircle size={64} className='text-red-500' />
          <h2 className='text-2xl font-bold uppercase'>
            {t('PaymentReturn.error_title') || 'Thông báo'}
          </h2>
          <p className='text-lg text-center text-zinc-500'>
            {error || 'Đã có lỗi xảy ra trong quá trình xử lý'}
          </p>
        </div>
        <Button
          onClick={() => navigate('/')}
          className='flex items-center gap-2'
        >
          <Home size={16} />
          {t('PaymentReturn.button_home')}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`
                flex flex-col px-4 lg:px-20 w-screen py-5 my-5 items-center
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
    >
      <div className='max-w-2xl w-full border border-gray-400 shadow-sm'>
        <div className='p-5 border-b border-gray-400 flex flex-col items-center text-center gap-2'>
          <div className='mb-2'>
            <CheckCircle size={48} className='text-green-600' />
          </div>
          <h1 className='text-xl font-bold uppercase'>
            {t('PaymentReturn.title')}
          </h1>
          <div className='flex items-center px-2 py-1 border border-green-500 text-green-700 text-[10px] font-bold uppercase rounded-none bg-green-50'>
            {transactionData.status}
          </div>
        </div>

        <div className='p-5 space-y-6'>
          <h2 className='font-semibold uppercase border-b pb-2 border-dashed border-gray-300'>
            {t('PaymentReturn.details')}
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'>
            <div className='space-y-1'>
              <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                {isAppointment
                  ? t('PaymentReturn.appointment_id')
                  : t('PaymentReturn.record_id')}
              </p>
              <p className='text-sm font-medium flex items-center gap-2'>
                #{transactionData.orderId}
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                {t('PaymentReturn.transaction_id')}
              </p>
              <p className='text-sm font-medium break-all'>
                {transactionData.transactionId}
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                {t('PaymentReturn.time')}
              </p>
              <p className='text-sm font-medium'>{transactionData.date}</p>
            </div>
            <div className='space-y-1'>
              <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                {t('PaymentReturn.customer')}
              </p>
              <p className='text-sm font-medium'>{transactionData.customer}</p>
            </div>
            <div className='col-span-full space-y-1'>
              <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                {t('PaymentReturn.payment_method')}
              </p>
              <p className='text-sm font-medium'>{transactionData.method}</p>
            </div>
          </div>

          <div className='mt-8 pt-6 border-t border-zinc-200 flex items-end justify-between'>
            <div>
              <p className='text-xs text-zinc-400 uppercase font-medium'>
                {t('PaymentReturn.total_amount')}
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {transactionData.amount}
              </p>
            </div>
            <div className='text-right pb-1'>
              <p className='text-[10px] text-zinc-400 italic'>
                {t('PaymentReturn.vat_included')}
              </p>
            </div>
          </div>
        </div>

        <div className='p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <Button
            onClick={() => navigate('/appointments')}
            className={`
                            border rounded-none transition-colors cursor-pointer h-12
                            ${
                              isDark
                                ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }
                        `}
          >
            {t('PaymentReturn.button_appointments')}
          </Button>
          <Button
            onClick={() => navigate('/')}
            className={`
                            border rounded-none transition-colors cursor-pointer h-12
                            ${
                              isDark
                                ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }
                        `}
          >
            {t('PaymentReturn.button_home')}
          </Button>
        </div>

        <div className='border-t border-gray-400 p-3 bg-gray-50/50 flex flex-wrap justify-center gap-4 sm:gap-8'>
          <button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
            <Printer size={14} />
            {t('PaymentReturn.print_receipt')}
          </button>
          <button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
            <Download size={14} />
            {t('PaymentReturn.download_pdf')}
          </button>
          <button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
            <ExternalLink size={14} />
            {t('PaymentReturn.support')}
          </button>
        </div>
      </div>
    </div>
  );
}
