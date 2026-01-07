import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/shared/apis/patientService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSaveOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const inputClass =
        'w-full bg-transparent border border-gray-300 focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none outline-none px-3 h-10';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleShowPassword = (field: 'current' | 'new' | 'confirm') => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const isVi = language === 'vi';

        if (!formData.currentPassword) {
            toast.error(
                isVi
                    ? 'Vui lòng nhập mật khẩu hiện tại'
                    : 'Current password is required'
            );
            return false;
        }
        if (!formData.newPassword) {
            toast.error(
                isVi ? 'Vui lòng nhập mật khẩu mới' : 'New password is required'
            );
            return false;
        }
        if (formData.newPassword.length < 6) {
            toast.error(
                isVi
                    ? 'Mật khẩu mới phải có ít nhất 6 ký tự'
                    : 'New password must be at least 6 characters'
            );
            return false;
        }
        if (!formData.confirmPassword) {
            toast.error(
                isVi
                    ? 'Vui lòng xác nhận mật khẩu mới'
                    : 'Please confirm new password'
            );
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error(
                isVi ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match'
            );
            return false;
        }
        if (formData.currentPassword === formData.newPassword) {
            toast.error(
                isVi
                    ? 'Mật khẩu mới không được trùng với mật khẩu cũ'
                    : 'New password cannot be the same as the current password'
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        console.log(formData);

        try {
            setIsLoading(true);
            const res: any = await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmPassword
            });

            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi'
                        ? res.data.viMessage || 'Đổi mật khẩu thành công'
                        : res.data.enMessage || 'Password changed successfully'
                );
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                navigate('/profile');
            } else {
                toast.error(
                    language === 'vi'
                        ? res?.data?.errViMessage ||
                              'Mật khẩu hiện tại không đúng'
                        : res?.data?.errEnMessage ||
                              'Incorrect current password'
                );
            }

            console.log(formData);
        } catch (error) {
            console.error(error);
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const renderPasswordInput = (
        labelKey: string,
        name: 'currentPassword' | 'newPassword' | 'confirmPassword',
        showKey: 'current' | 'new' | 'confirm'
    ) => (
        <div className='flex flex-col gap-2 relative'>
            <Label>
                {t(labelKey)}
                <span className='text-red-500 ml-1'>*</span>
            </Label>
            <div className='relative'>
                <Input
                    type={showPassword[showKey] ? 'text' : 'password'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`${inputClass} pr-10`}
                />
                <button
                    type='button'
                    className='absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer hover:text-blue-500'
                    onClick={() => toggleShowPassword(showKey)}
                >
                    {showPassword[showKey] ? (
                        <IoEyeOutline />
                    ) : (
                        <IoEyeOffOutline />
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {isLoading ? (
                <LoadingCommon />
            ) : (
                <div
                    className={`flex flex-col px-4 w-screen py-5 my-5 min-h-screen ${
                        isDark
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-black'
                    }`}
                >
                    <h1 className='text-2xl text-center font-bold pb-8'>
                        {t('changePassword.title') ||
                            (language === 'vi'
                                ? 'Đổi mật khẩu'
                                : 'Change Password')}
                    </h1>

                    <div className='flex flex-col gap-6 w-full max-w-xl mx-auto border border-gray-200 p-8 shadow-sm'>
                        {renderPasswordInput(
                            'changePassword.current',
                            'currentPassword',
                            'current'
                        )}

                        {renderPasswordInput(
                            'changePassword.new',
                            'newPassword',
                            'new'
                        )}

                        {renderPasswordInput(
                            'changePassword.confirm',
                            'confirmPassword',
                            'confirm'
                        )}

                        <div className='flex justify-end pt-4'>
                            <Button
                                onClick={handleSubmit}
                                className='flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-none text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors'
                            >
                                <IoSaveOutline />
                                {t('changePassword.change') ||
                                    (language === 'vi'
                                        ? 'Lưu thay đổi'
                                        : 'Save Changes')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
