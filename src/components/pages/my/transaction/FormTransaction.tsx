import { useEffect, useState } from "react";
import { ProcessType } from "@/src/utils/consts/ProcessType";
import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { CategoryListApiInterface } from "@/src/core/api/category/category-api";
import useListAccount from "@/src/components/pages/my/accounts/hooks/useListAccount";
import OptionType from "@/src/components/pages/my/accounts/components/form/OptionType";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Radio, Select } from "antd";
import useListCategory from "@/src/components/pages/my/categories/hooks/useListCategory";
import { PAYMENT_METHOD_CONST } from "@/src/utils/consts/PaymentMethod";

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

    const [categoriesForm, setCategoriesForm] = useState<CategoryListApiInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleFinish = (values: AccountCreateApiInterface) => {
        /*create(values, () => {
            closeForm();
            messageApi.success('Cuenta creada!');
        });*/
    }

    const handleValuesChange = (changedValues: any, values: any) => {
        if(changedValues.type) {
            const filterCategories = categories.filter(category => category.type == changedValues.type);
            setCategoriesForm(filterCategories as CategoryListApiInterface[]);
        }
    }

    useEffect(() => {
        listCategory();
        listAccount();
    }, [isOpen])

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
                >
                    <div className="relative flex gap-4">
                        <Form.Item label="Tipo transacción" name="type" required>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value={ProcessType.INCOME}>💰 Ingreso</Radio.Button>
                                <Radio.Button value={ProcessType.EXPENSE}>💸 Gasto  </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item className="flex-1" label="Monto" required name='amount'>
                            <InputNumber className="!w-full" placeholder="Monto" defaultValue={0} />
                        </Form.Item>
                    </div>
                    <Form.Item label="Descripción" name={'name'} required>
                        <Input placeholder="Ej: Compran en el supermercado Wong" autoComplete="off" />
                    </Form.Item>
                    <div className="relative flex gap-4">
                        <Form.Item label="Categoría" className="flex-1" required name='category' >
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
                        <Form.Item label="Cuenta/Fuente" className="flex-1" required name={'account'} >
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
                        <Form.Item label="Medio de pago" className="flex-1" required name='payment-method' >
                            <Select
                                placeholder="¿Cómo se realizó el pago?"
                                className="!w-full"
                                options={Object.entries(PAYMENT_METHOD_CONST).map(([key, payment]) => ({
                                    label: <div className="space-x-1"><span>{payment.icon}</span><span>{payment.name}</span></div>,
                                    value: key,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className="flex-1" label="Fecha" required name={'date'}>
                            <DatePicker className="!w-full" />
                        </Form.Item>
                    </div>
                     <Form.Item className="flex-1" label="Nota" name={'note'}>
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                    </Form.Item>
                    <Form.Item className="flex-1" >
                        <Button className="!w-full" type="primary" htmlType="submit" loading={true}>Guardar</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}