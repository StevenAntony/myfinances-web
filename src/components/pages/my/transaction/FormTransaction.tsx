import { useEffect, useState } from "react";
import { ProcessType } from "@/src/utils/consts/ProcessType";
import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { CategoryListApiInterface } from "@/src/core/api/category/category-api";
import useListAccount from "@/src/components/pages/my/accounts/hooks/useListAccount";
import OptionType from "@/src/components/pages/my/accounts/components/form/OptionType";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Radio, Select } from "antd";
import useListCategory from "@/src/components/pages/my/categories/hooks/useListCategory";
import { PAYMENT_METHOD_CONST } from "@/src/utils/consts/PaymentMethod";
import useCreateTransaction from "./hooks/useCreateTransaction";
import { TransactionCreateApiInterface } from "@/src/core/api/transaction/transaction-api";
import useListTransaction from "./hooks/useListTransaction";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/AppContext";

type Props = {
    isOpen: boolean;
    setOpen: (e: boolean) => void;
}

/**
 * => Se usa fuera de la pagina 
 *    -> Layout > SideBar  
 */
export default function FormTransaction({ 
    isOpen,
    setOpen,
}: Props) {
    const { categories, listCategory } = useListCategory();
    const { accounts, list: listAccount } = useListAccount();
    const { create, loading } = useCreateTransaction();
    const { setReloadTransaction } = useAppContext();

    const [categoriesForm, setCategoriesForm] = useState<CategoryListApiInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        // Validación adicional antes de enviar
        if (!validateFormData(values)) {
            messageApi.error('Por favor, verifica que todos los campos estén correctamente completados');
            return;
        }

        const body: TransactionCreateApiInterface = {
            account_id: values.account,
            category_id: values.category,
            payment_method: values['payment-method'],
            amount: values.amount,
            date: values.date.format('YYYY-MM-DD'),
            description: values.name,
            type: values.type,
            note: values.note
        }
        create(body, () => {
            setOpen(false);
            messageApi.success('Transacción creada!');
            setReloadTransaction(true);
            form.resetFields();
        });
    }

    const validateFormData = (values: any): boolean => {
        // Validar que el monto sea mayor a 0
        if (!values.amount || values.amount <= 0) {
            messageApi.error('El monto debe ser mayor a 0');
            return false;
        }

        // Validar que la descripción no esté vacía
        if (!values.name || values.name.trim() === '') {
            messageApi.error('La descripción es obligatoria');
            return false;
        }

        // Validar que se haya seleccionado una categoría
        if (!values.category) {
            messageApi.error('Debes seleccionar una categoría');
            return false;
        }

        // Validar que se haya seleccionado una cuenta
        if (!values.account) {
            messageApi.error('Debes seleccionar una cuenta');
            return false;
        }

        // Validar que se haya seleccionado un método de pago
        if (!values['payment-method']) {
            messageApi.error('Debes seleccionar un método de pago');
            return false;
        }

        // Validar que se haya seleccionado una fecha
        if (!values.date) {
            messageApi.error('Debes seleccionar una fecha');
            return false;
        }

        // Validar que se haya seleccionado un tipo de transacción
        if (!values.type) {
            messageApi.error('Debes seleccionar un tipo de transacción');
            return false;
        }

        return true;
    }

    const handleValuesChange = (changedValues: any, values: any) => {
        if(changedValues.type) {
            filterCategories(changedValues.type);
        }
    }

    const filterCategories = (type: string) => {
        const filterCategories = categories.filter(category => category.type == type);
        setCategoriesForm(filterCategories as CategoryListApiInterface[]);
        // Limpiar la categoría seleccionada cuando cambia el tipo
        form.setFieldsValue({ category: undefined });
    }

    useEffect(() => {
        listCategory();
        listAccount();
    }, [isOpen])

    useEffect(() => {
        filterCategories(ProcessType.EXPENSE);
    }, [categories])

    return (
        <>
            {contextHolder}
            <Drawer
                title="Crear Transacción"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setOpen(false)}
                open={isOpen}
                destroyOnHidden={true}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    onValuesChange={handleValuesChange}
                    initialValues={{
                        type: ProcessType.EXPENSE,
                        amount: 0,
                        date: dayjs()
                    }}
                >
                    <div className="relative flex gap-4">
                        <Form.Item 
                            label="Tipo transacción" 
                            name="type" 
                            rules={[
                                { required: true, message: 'Debes seleccionar un tipo de transacción' }
                            ]}
                        >
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value={ProcessType.INCOME}>💰 Ingreso</Radio.Button>
                                <Radio.Button value={ProcessType.EXPENSE}>💸 Gasto  </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                            className="flex-1" 
                            label="Monto" 
                            name='amount'
                            rules={[
                                { required: true, message: 'El monto es obligatorio' },
                                { type: 'number', min: 0.01, message: 'El monto debe ser mayor a 0' }
                            ]}
                        >
                            <InputNumber 
                                className="!w-full" 
                                placeholder="Monto" 
                                defaultValue={0}
                                min={0.01}
                                step={0.01}
                                precision={2}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item 
                        label="Descripción" 
                        name={'name'}
                        rules={[
                            { required: true, message: 'La descripción es obligatoria' },
                            { min: 3, message: 'La descripción debe tener al menos 3 caracteres' },
                            { max: 100, message: 'La descripción no puede exceder 100 caracteres' }
                        ]}
                    >
                        <Input placeholder="Ej: Compran en el supermercado Wong" autoComplete="off" />
                    </Form.Item>
                    <div className="relative flex gap-4">
                        <Form.Item 
                            label="Categoría" 
                            className="flex-1" 
                            name='category'
                            rules={[
                                { required: true, message: 'Debes seleccionar una categoría' }
                            ]}
                        >
                            <Select
                                placeholder="Seleccionar categoría"
                                className="!w-full"
                                options={
                                    categoriesForm.map(category => {
                                        return {
                                            label: <div className="space-x-1"><span>{category.icon}</span><span>{category.name}</span></div>,
                                            value: category.id
                                        }
                                    })
                                }
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Cuenta/Fuente" 
                            className="flex-1" 
                            name={'account'}
                            rules={[
                                { required: true, message: 'Debes seleccionar una cuenta' }
                            ]}
                        >
                            <Select
                                placeholder="Seleccionar cuenta"
                                className="!w-full"
                                options={accounts.map(account => {
                                    return {
                                        label: <OptionType 
                                                data={{ label: account.name, color: '', icon: account.type}} 
                                                id={account.type} 
                                            />,
                                        value: account.id,
                                    }
                                })}
                            />
                        </Form.Item>
                    </div>
                    <div className="relative flex gap-4">
                        <Form.Item 
                            label="Medio de pago" 
                            className="flex-1" 
                            name='payment-method'
                            rules={[
                                { required: true, message: 'Debes seleccionar un método de pago' }
                            ]}
                        >
                            <Select
                                placeholder="¿Cómo se realizó el pago?"
                                className="!w-full"
                                options={Object.entries(PAYMENT_METHOD_CONST).map(([key, payment]) => ({
                                    label: <div className="space-x-1"><span>{payment.icon}</span><span>{payment.name}</span></div>,
                                    value: key,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item 
                            className="flex-1" 
                            label="Fecha" 
                            name={'date'}
                            rules={[
                                { required: true, message: 'Debes seleccionar una fecha' }
                            ]}
                        >
                            <DatePicker className="!w-full" />
                        </Form.Item>
                    </div>
                     <Form.Item 
                        className="flex-1" 
                        label="Nota" 
                        name={'note'}
                        rules={[
                            { max: 500, message: 'La nota no puede exceder 500 caracteres' }
                        ]}
                    >
                        <Input.TextArea 
                            autoSize={{ minRows: 3, maxRows: 3 }} 
                            placeholder="Nota opcional sobre la transacción"
                        />
                    </Form.Item>
                    <Form.Item className="flex-1" >
                        <Button className="!w-full" type="primary" htmlType="submit" loading={loading}>Guardar</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}