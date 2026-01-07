import { Button } from '@/components/ui/button';
import { paymentVNPAYDetail } from '@/shared/apis/patientService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Loading from '@/shared/pages/Loading';
import { Download, ExternalLink, Printer } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export default function PaymentReturn() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const txnRef = searchParams.get('txnRef');
    const [transactionData, setTransactionData] = useState<any>(null);
    const [isAppointment, setIsAppointment] = useState(false);

    useEffect(() => {
        if (status === 'success' && txnRef) {
            const fetchPayment = async () => {
                const res = await paymentVNPAYDetail(txnRef);

                if (res.data.errCode === 0) {
                    const p = res.data.data;

                    setTransactionData({
                        orderId: p.appointmentId
                            ? `${p.appointmentId}`
                            : `${p.recordId}`,
                        transactionId: p.txnRef,
                        amount:
                            new Intl.NumberFormat('vi-VN').format(p.amount) +
                            ' VNĐ',
                        method: 'VNPay',
                        status:
                            p.status === 'success'
                                ? t('PaymentReturn.status_success')
                                : t('PaymentReturn.status_failed'),
                        date: new Date(p.createdAt).toLocaleString('vi-VN'),
                        customer: p.appointment?.patientName ?? ''
                    });

                    setIsAppointment(!!p.appointment);
                }
            };

            fetchPayment();
        }
    }, [status, txnRef, t]);

    return !transactionData ? (
        <Loading />
    ) : (
        <div
            className={`
                flex flex-col px-4 lg:px-20 w-screen py-5 my-5 items-center
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <div className='max-w-2xl w-full border border-gray-400'>
                <div className='p-5 border-b border-gray-400 flex flex-col items-center text-center gap-2'>
                    <h1 className='text-xl font-bold uppercase'>
                        {t('PaymentReturn.title')}
                    </h1>
                    <div className='flex items-center px-2 py-1 border border-green-500 text-green-700 text-[10px] font-bold uppercase rounded-none'>
                        {transactionData.status}
                    </div>
                </div>

                <div className='p-5 space-y-6'>
                    <h2 className='font-semibold uppercase'>
                        {t('PaymentReturn.details')}
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4'>
                        <div className='space-y-1'>
                            <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                                {isAppointment
                                    ? t('PaymentReturn.appointment_id')
                                    : t('PaymentReturn.record_id')}
                            </p>
                            <p className='text-sm font-medium flex items-center gap-2'>
                                {transactionData.orderId}
                            </p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                                {t('PaymentReturn.transaction_id')}
                            </p>
                            <p className='text-sm font-medium'>
                                {transactionData.transactionId}
                            </p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                                {t('PaymentReturn.time')}
                            </p>
                            <p className='text-sm font-medium'>
                                {transactionData.date}
                            </p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                                {t('PaymentReturn.customer')}
                            </p>
                            <p className='text-sm font-medium'>
                                {transactionData.customer}
                            </p>
                        </div>
                        <div className='col-span-full space-y-1'>
                            <p className='text-xs text-zinc-400 uppercase tracking-tight'>
                                {t('PaymentReturn.payment_method')}
                            </p>
                            <p className='text-sm font-medium'>
                                {transactionData.method}
                            </p>
                        </div>
                    </div>

                    <div className='mt-8 pt-6 border-t border-zinc-100 flex items-end justify-between'>
                        <div>
                            <p className='text-xs text-zinc-400 uppercase font-medium'>
                                {t('PaymentReturn.total_amount')}
                            </p>
                            <p className='text-2xl font-bold mt-1 text-zinc-900'>
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
                        className={`
                            border rounded-none transition-colors cursor-pointer
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
                        className={`
                            border rounded-none transition-colors cursor-pointer
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

                <div className='border-t border-gray-400 p-2 flex justify-center gap-8'>
                    <Button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
                        <Printer size={14} />
                        {t('PaymentReturn.print_receipt')}
                    </Button>
                    <Button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
                        <Download size={14} />
                        {t('PaymentReturn.download_pdf')}
                    </Button>
                    <Button className='flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors'>
                        <ExternalLink size={14} />
                        {t('PaymentReturn.support')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
