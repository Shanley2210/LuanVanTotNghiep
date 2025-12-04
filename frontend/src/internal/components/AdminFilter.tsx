import { Checkbox, DatePicker, Form, Input, Select, Upload } from 'antd';
import { useContext, useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import type { Dayjs } from 'dayjs';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import AdminEditor from './AdminEditor';

type baseFilter = {
    name: string;
    label?: string;
    placeholder?: string;
    width?: string | number;
};

type inputFilter = baseFilter & {
    type: 'input';
};

type textareaFilter = baseFilter & {
    type: 'textarea';
    rows?: number;
};

type editorFilter = baseFilter & {
    type: 'editor';
};

type selectFilter = baseFilter & {
    type: 'select';
    options: {
        value: string;
        label: string;
    }[];
    width?: number;
};

type dateFilter = baseFilter & {
    type: 'date';
};

type monthFilter = baseFilter & {
    type: 'month';
};

type checkboxFilter = baseFilter & {
    type: 'checkbox';
};

type checkBoxGroupFilter = baseFilter & {
    type: 'checkboxGroup';
    options: {
        value: string;
        label: string;
    }[];
};

type uploadFilter = baseFilter & { type: 'upload' };

export type filterConfig =
    | inputFilter
    | selectFilter
    | textareaFilter
    | editorFilter
    | dateFilter
    | monthFilter
    | checkboxFilter
    | checkBoxGroupFilter
    | uploadFilter;

type FilterProps = {
    filters: filterConfig[];
    onChange: (values: Record<string, any>) => void;
    initialValues?: Record<string, any>;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminFilter({
    filters,
    onChange,
    initialValues
}: FilterProps) {
    const [values, setValues] = useState<Record<string, any>>(
        initialValues || {}
    );
    const { isDark } = useContext(ThemeContext);
    const { i18n } = useTranslation();
    const language = i18n.language;

    const handleChange = (name: string, value: any) => {
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        onChange(newValues);
    };

    const beforeUpload = (file: any) => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            if (language === 'en') {
                toast.error('Image must be smaller than 5MB!');
            } else if (language === 'vi') {
                toast.error('Hình ảnh phải nhỏ hơn 5MB!');
            }
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const renderInput = (filter: filterConfig) => {
        switch (filter.type) {
            case 'input':
                return (
                    <Input
                        placeholder={filter.placeholder || ''}
                        allowClear
                        value={values[filter.name]}
                        onChange={(e) =>
                            handleChange(filter.name, e.target.value)
                        }
                    />
                );

            case 'textarea':
                return (
                    <Input.TextArea
                        placeholder={filter.placeholder || ''}
                        allowClear
                        rows={filter.rows || 3}
                        value={values[filter.name]}
                        onChange={(e) =>
                            handleChange(filter.name, e.target.value)
                        }
                        style={{ width: '100%' }}
                    />
                );

            case 'editor':
                return (
                    <AdminEditor
                        content={values[filter.name] || ''}
                        onChange={(html) => handleChange(filter.name, html)}
                    />
                );

            case 'select':
                return (
                    <Select
                        placeholder={filter.placeholder || ''}
                        allowClear
                        options={filter.options}
                        value={values[filter.name]}
                        onChange={(value) => handleChange(filter.name, value)}
                        style={{ width: filter.width || '100%' }}
                    />
                );

            case 'date':
                return (
                    <DatePicker
                        placeholder={filter.placeholder || ''}
                        allowClear
                        value={values[filter.name]}
                        onChange={(date: Dayjs) =>
                            handleChange(filter.name, date)
                        }
                        style={{ width: '100%' }}
                    />
                );

            case 'month':
                return (
                    <DatePicker
                        picker='month'
                        placeholder={filter.placeholder || ''}
                        allowClear
                        value={
                            values[filter.name]
                                ? dayjs(values[filter.name])
                                : null
                        }
                        onChange={(date: Dayjs) =>
                            handleChange(
                                filter.name,
                                date ? date.format('YYYY-MM') : null
                            )
                        }
                        style={{ width: '100%' }}
                    />
                );

            case 'checkbox':
                return (
                    <ToggleSwitch
                        checked={!!values[filter.name]}
                        onToggle={(checked) =>
                            handleChange(filter.name, checked)
                        }
                    />
                );

            case 'checkboxGroup':
                return (
                    <Checkbox.Group
                        options={filter.options}
                        value={values[filter.name] || []}
                        onChange={(checkedValues) =>
                            handleChange(filter.name, checkedValues)
                        }
                    />
                );

            case 'upload':
                return (
                    <Upload
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        listType='picture-card'
                        showUploadList={{ showPreviewIcon: false }}
                        onPreview={() => false}
                        defaultFileList={
                            initialValues?.image &&
                            typeof initialValues.image === 'string'
                                ? [
                                      {
                                          uid: '-1',
                                          name: 'current.png',
                                          status: 'done',
                                          url: initialValues.image.startsWith(
                                              BACKEND_URL
                                          )
                                              ? initialValues.image
                                              : `${BACKEND_URL}${initialValues.image}`
                                      }
                                  ]
                                : []
                        }
                        onChange={(info) => {
                            const file =
                                info.fileList[0]?.originFileObj || null;
                            handleChange(filter.name, file);
                        }}
                        style={{ borderRadius: 0 }}
                    >
                        {values[filter.name] ? null : filter.placeholder}
                    </Upload>
                );

            default:
                return null;
        }
    };

    return (
        <div className='flex flex-wrap w-full -mx-2'>
            {filters.map((filter: filterConfig) => {
                const wrapperWidth = filter.width || '50%';

                const labelNode = filter.label ? (
                    <span
                        className={`${
                            isDark ? 'text-gray-100' : 'text-neutral-900'
                        }`}
                    >
                        {filter.label}
                    </span>
                ) : null;

                return (
                    <div
                        key={filter.name}
                        style={{ width: wrapperWidth }}
                        className='px-2 mb-4'
                    >
                        <Form.Item
                            label={labelNode}
                            layout='vertical'
                            style={{ marginBottom: 0, width: '100%' }}
                        >
                            {renderInput(filter)}
                        </Form.Item>
                    </div>
                );
            })}
        </div>
    );
}
