'use client'
import { Form, Input, message, Modal } from "antd";
import { useProfilePageContext } from "../../contexts/ProfileContext";
import { useAuthContext } from "@/src/context/AuthContext";
import { AVARTAR_DEFAULT } from "@/src/utils/consts/ProfileConst";
import avatarUrl from "@/src/utils/shared/urls/avatarUrl";

export default function FormProfile() {
    const { isOpenForm, setOpenForm, updateProfile, loading, error } = useProfilePageContext();
    const { profile } = useAuthContext();
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        setOpenForm(false);
    };

    const handleFinish = async (values: any) => {
        updateProfile(values, () => {
            message.success('Perfil actualizado');
            setOpenForm(false);
        });
    };

    return (
        <Modal
            title="Editar perfil"
            open={isOpenForm}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText="Guardar"
            cancelText="Cancelar"
            confirmLoading={loading}
            okButtonProps={{ disabled: loading }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: profile?.name,
                    email: profile?.email,
                    budget: profile?.budget,
                    avatar: profile?.avatar || 'avatar0101'
                }}
                onFinish={handleFinish}
            >
                <Form.Item label="Avatar" name="avatar" rules={[{ required: true, message: 'Seleccione un avatar' }]}>
                    <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.avatar !== curValues.avatar} noStyle>
                        {({ getFieldValue }) => {
                            const selectedAvatar = getFieldValue('avatar');
                            return (
                                <div className="grid grid-cols-4 gap-4" style={{ cursor: 'pointer' }}>
                                    {Object.entries(AVARTAR_DEFAULT).map(([key, url]) => (
                                        <div key={key}>
                                            <img
                                                src={avatarUrl(url)}
                                                alt={key}
                                                className={`w-16 h-16 cursor-pointer rounded-full border-2 transition-all ${
                                                    selectedAvatar === key
                                                        ? 'border-blue-500 ring-2 ring-blue-300'
                                                        : 'border-transparent'
                                                }`}
                                                onClick={() => form.setFieldsValue({ avatar: key })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese su nombre' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Correo" name="email" rules={[{ required: true, type: 'email', message: 'Ingrese un correo válido' }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Presupuesto mensual" name="budget" rules={[{ required: true, message: 'Ingrese su presupuesto' }]}>
                    <Input type="number" min={0} />
                </Form.Item>
            </Form>
        </Modal>
    )
}