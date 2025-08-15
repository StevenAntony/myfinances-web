import { Button, Drawer, Form, Input, InputNumber, message, Select } from "antd";
import { useAccountPageContext } from "./contexts/AccountPageContext";
import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { AccountTypeInfo } from "@/src/utils/consts/AccountType";
import OptionType from "./components/form/OptionType";
import { useEffect } from "react";

type Props = {}

export default function FormAccount({ }: Props) {
    const { isOpenForm, closeForm, create, loadingSaveAccount, selectedAccount, refreshAccounts  } = useAccountPageContext();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleFinish = (values: AccountCreateApiInterface) => {
        create(values, (success) => {
            if(success){
                closeForm();
                refreshAccounts();
                messageApi.success(`${selectedAccount ? 'Cuenta actualizada' : 'Cuenta creada'}`);
            }else{
                messageApi.error(`${selectedAccount ? 'Error al actualizar la cuenta' : 'Error al crear la cuenta'}`);
            }
        }, selectedAccount?.id);
    }

    useEffect(() => {
        if(!isOpenForm){
            form.resetFields();
        }
    }, [isOpenForm]);

    useEffect(() => {
        if (selectedAccount && isOpenForm) {
            form.setFieldsValue({
                name: selectedAccount.name,
                type: selectedAccount.type,
                balance: selectedAccount.balance,
                bank: selectedAccount.bank,
                accountNumber: selectedAccount.accountNumber,
                creditLimit: selectedAccount.creditLimit
            });
        }
    }, [selectedAccount, isOpenForm, form]);

    return (
        <>
            {contextHolder}
            <Drawer
                title={selectedAccount ? `Editar cuenta "${selectedAccount.name}"` : 'Crear cuenta'}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={closeForm}
                open={isOpenForm}
                width={400}
                destroyOnHidden={true}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item label="Nombre" name={'name'} required>
                        <Input placeholder="Nombre cuenta..." autoComplete="off" />
                    </Form.Item>
                    <div className="relative flex gap-4">
                        <Form.Item label="Tipo cuenta" className="flex-1" required name={'type'} >
                            <Select
                                placeholder="Seleccionar Tipo"
                                className="!w-full"
                                disabled={selectedAccount != null}
                                options={Object.entries(AccountTypeInfo).map(([key, info]) => ({
                                    label: <OptionType data={info} id={key} />,
                                    value: key,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className="flex-1" label="Balance" required name={'balance'}>
                            <InputNumber className="!w-full" placeholder="Balance" disabled={selectedAccount != null} defaultValue={0} />
                        </Form.Item>
                    </div>
                    <Form.Item label="Banco/Institución" name={'bank'}>
                        <Input placeholder="Nombre banco/institución..." />
                    </Form.Item>
                     <Form.Item className="flex-1" label="Numero cuenta" name={'accountNumber'}>
                        <InputNumber className="!w-full" placeholder="Numero cuenta" />
                    </Form.Item>
                     <Form.Item className="flex-1" label="Limite credito" name={'creditLimit'}>
                        <InputNumber className="!w-full" placeholder="Limite de credito" />
                    </Form.Item>
                    <Form.Item className="flex-1" >
                        <Button className="!w-full" type="primary" htmlType="submit" loading={loadingSaveAccount}>Guardar</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}