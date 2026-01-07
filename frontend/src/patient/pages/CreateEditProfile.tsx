import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createProfile, updateProfile } from '@/shared/apis/patientService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchPatientProfile,
    selectPatient
} from '@/shared/stores/patientSlice';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoSaveOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddressSelector } from '../components/AddressSelector';

export default function CreateEditProfile() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(selectPatient);

    const isEditMode = !!profile;

    const [formData, setFormData] = useState({
        dob: '',
        gender: '1',
        ethnicity: '',
        insuranceTerm: '',
        insuranceNumber: '',
        notePMH: '',
        currentAddress: {
            provinceCode: '',
            provinceName: '',
            wardCode: '',
            wardName: '',
            detail: ''
        },
        familyAddress: {
            provinceCode: '',
            provinceName: '',
            wardCode: '',
            wardName: '',
            detail: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (profile) {
            const convertDate = (dateStr: string | undefined) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return !isNaN(date.getTime())
                    ? date.toISOString().split('T')[0]
                    : '';
            };

            setFormData({
                dob: convertDate(profile.dob),
                gender: String(profile.gender),
                ethnicity: profile.ethnicity || '',
                insuranceNumber: profile.insuranceNumber || '',
                insuranceTerm: convertDate(profile.insuranceTerm),
                notePMH: profile.notePMH || '',

                currentAddress: {
                    provinceCode: '',
                    provinceName: '',
                    wardCode: '',
                    wardName: '',
                    detail: profile.address || ''
                },
                familyAddress: {
                    provinceCode: '',
                    provinceName: '',
                    wardCode: '',
                    wardName: '',
                    detail: profile.familyAddress || ''
                }
            });
        }
    }, [profile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (
        type: 'currentAddress' | 'familyAddress',
        newValue: any
    ) => {
        setFormData((prev) => ({
            ...prev,
            [type]: newValue
        }));
    };

    const validateForm = () => {
        const isVi = language === 'vi';
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!formData.dob) {
            toast.error(
                isVi ? 'Vui lòng nhập ngày sinh' : 'Date of birth is required'
            );
            return false;
        }
        const dobDate = new Date(formData.dob);
        if (dobDate > today) {
            toast.error(
                isVi
                    ? 'Ngày sinh không được lớn hơn hôm nay'
                    : 'Date of birth cannot be in the future'
            );
            return false;
        }

        if (!formData.gender) {
            toast.error(
                isVi ? 'Vui lòng chọn giới tính' : 'Gender is required'
            );
            return false;
        }

        if (!formData.ethnicity.trim()) {
            toast.error(
                isVi ? 'Vui lòng nhập dân tộc' : 'Ethnicity is required'
            );
            return false;
        }

        if (!formData.currentAddress.detail.trim()) {
            toast.error(
                isVi
                    ? 'Vui lòng nhập địa chỉ hiện tại'
                    : 'Current address is required'
            );
            return false;
        }

        const hasInsNum = !!formData.insuranceNumber.trim();
        const hasInsTerm = !!formData.insuranceTerm;

        if ((hasInsNum && !hasInsTerm) || (!hasInsNum && hasInsTerm)) {
            toast.error(
                isVi
                    ? 'Vui lòng nhập đầy đủ Số thẻ và Hạn BHYT nếu có sử dụng'
                    : 'Please provide both Insurance Number and Term if applicable'
            );
            return false;
        }

        if (hasInsTerm) {
            const termDate = new Date(formData.insuranceTerm);
            if (termDate < today) {
                toast.error(
                    isVi
                        ? 'Hạn bảo hiểm không được thấp hơn hôm nay'
                        : 'Insurance term cannot be in the past'
                );
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const finalNote =
            formData.notePMH.trim() === ''
                ? language === 'vi'
                    ? 'Chưa có'
                    : 'None'
                : formData.notePMH;

        const formatAddress = (addr: typeof formData.currentAddress) => {
            if (!addr.provinceName) return addr.detail;
            return `${addr.detail}, Phường ${addr.wardName}, Tỉnh ${addr.provinceName}`;
        };

        const payloadData = {
            dob: formData.dob,
            gender: formData.gender,
            ethnicity: formData.ethnicity,
            address: formatAddress(formData.currentAddress),
            insuranceTerm: formData.insuranceTerm,
            insuranceNumber: formData.insuranceNumber,
            familyAddress: formatAddress(formData.familyAddress),
            notePMH: finalNote
        };

        try {
            setIsLoading(true);
            let res;

            if (isEditMode) {
                res = await updateProfile(payloadData);
            } else {
                res = await createProfile(payloadData);
            }

            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi'
                        ? isEditMode
                            ? 'Cập nhật hồ sơ thành công'
                            : res.data.viMessage
                        : isEditMode
                        ? 'Profile updated successfully'
                        : res.data.enMessage
                );

                dispatch(fetchPatientProfile());
                navigate('/profile');
            } else {
                toast.error(
                    language === 'vi'
                        ? res?.data?.errViMessage || 'Có lỗi xảy ra'
                        : res?.data?.errEnMessage || 'An error occurred'
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        'w-full bg-transparent border border-gray-300 focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none outline-none px-3 h-10';
    const textareaClass =
        'w-full bg-transparent border border-gray-300 focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none outline-none px-3 py-2';

    return (
        <>
            {isLoading ? (
                <LoadingCommon />
            ) : (
                <div
                    className={`flex flex-col px-4 lg:px-20 w-screen py-5 my-5 min-h-screen ${
                        isDark
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-black'
                    }`}
                >
                    <h1 className='text-2xl text-center font-bold pb-8'>
                        {isEditMode
                            ? t('patientProfile.cn')
                            : t('patientProfile.ths')}
                    </h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto'>
                        <div className='flex flex-col gap-2 relative'>
                            <Label>
                                {t('patientProfile.bd')}
                                <span className='text-red-500 ml-1'>*</span>
                            </Label>
                            <div className='relative'>
                                <Input
                                    type='date'
                                    name='dob'
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`${inputClass} pr-10`}
                                    id='dobInput'
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 bottom-2 text-xl text-gray-500 cursor-pointer hover:text-blue-500'
                                    onClick={() => {
                                        (
                                            document.getElementById(
                                                'dobInput'
                                            ) as HTMLInputElement
                                        )?.showPicker();
                                    }}
                                >
                                    <IoCalendarOutline />
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label>
                                {t('patientProfile.gd')}
                                <span className='text-red-500 ml-1'>*</span>
                            </Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) =>
                                    handleSelectChange('gender', value)
                                }
                            >
                                <SelectTrigger
                                    className={`${inputClass} ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className='bg-white rounded-none border-none'>
                                    <SelectItem
                                        value='1'
                                        className='cursor-pointer hover:bg-gray-200 rounded-none'
                                    >
                                        {t('patientProfile.ma')}
                                    </SelectItem>
                                    <SelectItem
                                        value='0'
                                        className='cursor-pointer hover:bg-gray-200 rounded-none'
                                    >
                                        {t('patientProfile.fm')}
                                    </SelectItem>
                                    <SelectItem
                                        value='2'
                                        className='cursor-pointer hover:bg-gray-200 rounded-none'
                                    >
                                        {t('patientProfile.ot')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label>
                                {t('patientProfile.dt')}
                                <span className='text-red-500 ml-1'>*</span>
                            </Label>
                            <Input
                                name='ethnicity'
                                value={formData.ethnicity}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label>{t('patientProfile.in')}</Label>
                            <Input
                                name='insuranceNumber'
                                value={formData.insuranceNumber}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label>{t('patientProfile.it')}</Label>
                            <div className='relative'>
                                <Input
                                    type='date'
                                    name='insuranceTerm'
                                    value={formData.insuranceTerm}
                                    onChange={handleChange}
                                    className={inputClass}
                                    id='bhytInput'
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 bottom-2 text-xl text-gray-500 cursor-pointer hover:text-blue-500'
                                    onClick={() => {
                                        (
                                            document.getElementById(
                                                'bhytInput'
                                            ) as HTMLInputElement
                                        )?.showPicker();
                                    }}
                                >
                                    <IoCalendarOutline />
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <AddressSelector
                                label={t('patientProfile.ad')}
                                value={formData.currentAddress}
                                onChange={(val) =>
                                    handleAddressChange('currentAddress', val)
                                }
                                isDark={isDark}
                                inputClass={inputClass}
                            />
                        </div>

                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <AddressSelector
                                label={t('patientProfile.fa')}
                                value={formData.familyAddress}
                                onChange={(val) =>
                                    handleAddressChange('familyAddress', val)
                                }
                                isDark={isDark}
                                inputClass={inputClass}
                            />
                        </div>

                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <Label>{t('patientProfile.np')}</Label>
                            <Textarea
                                name='notePMH'
                                value={formData.notePMH}
                                onChange={handleChange}
                                rows={4}
                                className={textareaClass}
                            />
                        </div>

                        <div />
                        <div className='flex justify-end'>
                            <Button
                                onClick={handleSubmit}
                                className='flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-none text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors'
                            >
                                <IoSaveOutline />
                                {isEditMode
                                    ? t('patientProfile.cn')
                                    : t('patientProfile.ths')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
