import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Select } from "antd";
import { useGoalPageContext } from "../../contexts/GoalPageContext";

export default function FormGoal() {
    const { isOpenForm, closeForm } = useGoalPageContext();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const icons = [
        { label: '📈 Progreso', value: '📈' },
        { label: '📦 Proyecto', value: '📦' },
        { label: '🎯 Objetivo y Logro', value: '🎯' },
        { label: '💰 Ahorro', value: '💰' },
        { label: '🏠 Casa', value: '🏠' },
        { label: '🚗 Carro', value: '🚗' },
        { label: '🛡 Protección', value: '🛡' },
        { label: '✈️ Viaje', value: '✈️' },
        { label: '🎁 Regalo', value: '🎁' },
        { label: '🚨 Emergencia', value: '🚨' },
        { label: '🎓 Educación', value: '🎓' }
    ];

    const handleFinish = (values: any) => {
        // create(values, () => {
        //     closeForm();
        //     messageApi.success('Cuenta creada!');
        // });
    }

    return (
        <>
            {contextHolder}
            <Drawer
                title="Crear meta"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={closeForm}
                open={isOpenForm}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <div className="relative flex gap-4">
                        <Form.Item label="Icono" name={'icon'} required>
                            <Select
                                placeholder="Seleccionar Icono"
                                className="!w-full"
                                options={icons.map((icon) => ({
                                    label: icon.label,
                                    value: icon.value,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className="flex-1" label="Meta" name={'name'} required>
                            <Input placeholder="Nombre meta..." autoComplete="off" />
                        </Form.Item>
                    </div>
                    <Form.Item label="Descripción" name={'description'}>
                        <Input placeholder="Descripción meta..." autoComplete="off" />
                    </Form.Item>
                    <div className="relative flex gap-4">
                        <Form.Item className="flex-1" label="Meta" name={'goal_amount'} required>
                            <InputNumber className="!w-full" placeholder="Meta monto" />
                        </Form.Item>
                        <Form.Item className="flex-1" label="Aporte inicial" name={'initial_amount'} required>
                            <InputNumber className="!w-full" placeholder="Aporte inicial" />
                        </Form.Item>
                        
                        <Form.Item className="flex-1" label="Fecha meta" name={'date'} required>
                            <DatePicker />
                        </Form.Item>
                    </div>
                    <Form.Item className="flex-1" >
                        <Button className="!w-full" type="primary" htmlType="submit" loading={false}>Guardar</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}