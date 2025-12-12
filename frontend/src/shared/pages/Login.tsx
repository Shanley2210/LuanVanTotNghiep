import { Card, CardContent } from '@/components/ui/card';
import InputCommon from '@shared/components/InputCommon';
import ButtonCommon from '@shared/components/ButtonCommon';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../stores/hooks';
import { login } from '../stores/authSlice';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '../contexts/ThemeContext';

interface LoginForm {
    emailOrPhone: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLoading, setIsLoading] = useState(false);
    const { isDark } = useContext(ThemeContext);

    const { register, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            emailOrPhone: '',
            password: ''
        }
    });

    const onError = (errors: any) => {
        if (errors.emailOrPhone?.type === 'required') {
            toast.error(
                language === 'vi'
                    ? 'Email hoặc số điện thoại không được để trống'
                    : 'Email or Phone is required'
            );
            return;
        }
        if (errors.password?.type === 'required') {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu không được để trống'
                    : 'Password is required'
            );
            return;
        }
        if (errors.password?.type === 'minLength') {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu phải có ít nhất 6 ký tự'
                    : 'Password must be at least 6 characters'
            );
            return;
        }
    };

    const onSubmit = async (data: LoginForm) => {
        const inputVal = data.emailOrPhone.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]+$/;

        const isEmail = emailRegex.test(inputVal);
        const isPhone = phoneRegex.test(inputVal);

        if (!isEmail && !isPhone) {
            toast.error(
                language === 'vi'
                    ? 'Định dạng Email hoặc Số điện thoại không hợp lệ'
                    : 'Invalid Email or Phone number format'
            );
            return;
        }

        if (isPhone) {
            if (inputVal.length < 9 || inputVal.length > 11) {
                toast.error(
                    language === 'vi'
                        ? 'Số điện thoại phải từ 9 đến 11 số'
                        : 'Phone number must be between 9 and 11 digits'
                );
                return;
            }
        }

        const dataLogin = {
            emailOrPhone: inputVal,
            password: data.password
        };

        try {
            setIsLoading(true);
            const resultAction = await dispatch(login(dataLogin));

            if (login.fulfilled.match(resultAction)) {
                toast.success(
                    language === 'vi'
                        ? 'Đăng nhập thành công'
                        : 'Login successfully'
                );
                switch (resultAction.payload.user.role) {
                    case 1:
                        navigate('/admin/dashboard');
                        break;
                    case 2:
                        navigate('/admin/dashboard');
                        break;
                    case 3:
                        navigate('/');
                        break;
                    case 4:
                        navigate('/doctor/dailyboard');
                        break;
                    case 5:
                        navigate('/receptionist/dailyboard');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else if (login.rejected.match(resultAction)) {
                const errMessage =
                    resultAction.payload || 'Đã xãy ra lỗi không xác định';

                toast.error(errMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`
                min-h-screen flex lg:flex-row items-center justify-center sm:p-4 select-none
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card
                    className={`
                        shadow-none rounded-none
                        ${
                            isDark
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-400'
                        }
                    `}
                >
                    <CardContent className='p-5'>
                        <div className='flex justify-center mb-6'>
                            <h2
                                className={`
                                    text-2xl font-semibold
                                    ${isDark ? 'text-white' : 'text-gray-800'}
                                `}
                            >
                                {t('login.tt')}
                            </h2>
                        </div>

                        <form
                            className='space-y-4'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <InputCommon
                                lable={t('login.mp')}
                                type='text'
                                {...register('emailOrPhone', {
                                    required: true
                                })}
                            />

                            <div className='relative'>
                                <InputCommon
                                    lable={t('login.pa')}
                                    type='password'
                                    isPassword={true}
                                    {...register('password', {
                                        required: true,
                                        minLength: 6
                                    })}
                                />
                            </div>

                            <ButtonCommon label={t('login.si')} type='submit' />
                        </form>

                        <div className='flex items-center my-6'>
                            <div
                                className={`grow border-t ${
                                    isDark
                                        ? 'border-gray-600'
                                        : 'border-gray-400'
                                }`}
                            ></div>

                            <span
                                className={`
                                    mx-4 text-sm font-light
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-500'
                                    }
                                `}
                            >
                                {t('login.or')}
                            </span>

                            <div
                                className={`grow border-t ${
                                    isDark
                                        ? 'border-gray-600'
                                        : 'border-gray-400'
                                }`}
                            ></div>
                        </div>

                        <ButtonCommon label={t('login.gg')} isGoogle={true} />

                        <div
                            className={`
                                text-center mt-6 text-sm
                                ${isDark ? 'text-gray-300' : 'text-black'}
                            `}
                        >
                            {t('login.do')}{' '}
                            <span
                                className='text-blue-600 font-medium hover:underline cursor-pointer'
                                onClick={() => navigate('/register')}
                            >
                                {t('login.su')}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isLoading && <LoadingCommon />}

            <div className='lg:flex lg:w-1/2 p-4 hidden'>
                <img
                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/login-banner.png'
                    alt=''
                    className={`${isDark ? 'opacity-80' : ''}`}
                />
            </div>
        </div>
    );
}
