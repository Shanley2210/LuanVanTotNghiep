import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { Select, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { fetchPatients, selectPatient } from '@/shared/stores/patientSlice';
import { useTranslation } from 'react-i18next';

export default function PatientManage() {
    const { isDark } = useContext(ThemeContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useAppDispatch();
    const { list: patients } = useAppSelector(selectPatient);
    const { t } = useTranslation();

    const currentData = patients.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (value: number) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: t('patient.na'),
            dataIndex: 'user',
            key: 'name',
            render: (user: any) => user?.name
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'email',
            render: (user: any) => user?.email
        },
        {
            title: t('patient.ph'),
            dataIndex: 'user',
            key: 'phone',
            render: (user: any) => user?.phone
        },
        {
            title: t('patient.gd'),
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: any) => {
                if (gender === '1') {
                    return t('patient.ma');
                } else if (gender === '0') {
                    return t('patient.fm');
                } else {
                    return t('patient.ot');
                }
            }
        },
        {
            title: t('patient.ad'),
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: t('patient.bd'),
            dataIndex: 'dob',
            key: 'birthdate',
            render: (dob: any) => {
                if (dob) {
                    const date = new Date(dob);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                return '';
            }
        },
        {
            title: t('patient.et'),
            dataIndex: 'ethnicity',
            key: 'ethnicity'
        },
        {
            title: t('patient.fa'),
            dataIndex: 'familyAddress',
            key: 'familyAddress'
        },
        {
            title: t('patient.in'),
            dataIndex: 'insuranceNumber',
            key: 'insuranceNumber'
        },
        {
            title: t('patient.it'),
            dataIndex: 'insuranceTerm',
            key: 'insuranceTerm'
        },
        {
            title: t('patient.np'),
            dataIndex: 'notePMH',
            key: 'notePMH'
        }
    ];

    console.log(patients);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('patient.tt')}
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'>{t('patient.ds')}</div>
            </div>

            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex gap-5 mb-5'>
                    <Select
                        defaultValue={pageSize}
                        style={{ width: 70 }}
                        options={[
                            { value: '10', label: '10' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' }
                        ]}
                        onChange={handlePageSizeChange}
                    />
                    <div
                        className={`flex items-center text-base text-center ${
                            isDark ? 'text-gray-100' : 'text-neutral-900'
                        }`}
                    >
                        {t('patient.epg')}
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        dataSource={currentData}
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={patients.length}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
