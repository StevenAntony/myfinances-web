import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Select } from "antd";
import { useGoalPageContext } from "../../contexts/GoalPageContext";
import dayjs from 'dayjs';

export default function FormGoal() {
    const { isOpenForm, closeForm, create, loadingCreate, list } = useGoalPageContext();
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
        // Formatear la fecha antes de enviar
        const formattedValues = {
            ...values,
            date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null
        };
        
        create(formattedValues, () => {
            form.resetFields();
            closeForm();
            list();
            messageApi.success('Meta creada exitosamente!');
        });
    };

    const handleClose = () => {
        form.resetFields();
        closeForm();
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title="Crear meta"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={handleClose}
                open={isOpenForm}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <div className="relative flex gap-4">
                        <Form.Item 
                            label="Icono" 
                            name={'icon'} 
                            rules={[
                                { required: true, message: 'Por favor selecciona un icono' }
                            ]}
                        >
                            <Select
                                placeholder="Seleccionar Icono"
                                className="!w-full"
                                options={icons.map((icon) => ({
                                    label: icon.label,
                                    value: icon.value,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item 
                            className="flex-1" 
                            label="Meta" 
                            name={'name'} 
                            rules={[
                                { required: true, message: 'El nombre de la meta es requerido' },
                                { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                { max: 50, message: 'El nombre no puede exceder 50 caracteres' },
                                { pattern: /^[a-zA-Z0-9\s\u00C0-\u017F]+$/, message: 'Solo se permiten letras, números y espacios' }
                            ]}
                        >
                            <Input placeholder="Nombre meta..." autoComplete="off" />
                        </Form.Item>
                    </div>
                    <Form.Item 
                        label="Descripción" 
                        name={'description'}
                        rules={[
                            { max: 200, message: 'La descripción no puede exceder 200 caracteres' }
                        ]}
                    >
                        <Input.TextArea 
                            placeholder="Descripción meta..." 
                            autoComplete="off" 
                            rows={3}
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>
                    <div className="relative flex gap-4">
                        <Form.Item 
                            className="flex-1" 
                            label="Meta" 
                            name={'goal_amount'} 
                            rules={[
                                { required: true, message: 'El monto de la meta es requerido' },
                                { type: 'number', min: 1, message: 'El monto debe ser mayor a 0' },
                                { type: 'number', max: 999999999, message: 'El monto es demasiado alto' }
                            ]}
                        >
                            <InputNumber 
                                className="!w-full" 
                                placeholder="Meta monto" 
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                precision={2}
                            />
                        </Form.Item>
                        <Form.Item 
                            className="flex-1" 
                            label="Aporte inicial" 
                            name={'initial_amount'} 
                            rules={[
                                { required: true, message: 'El aporte inicial es requerido' },
                                { type: 'number', min: 0, message: 'El aporte no puede ser negativo' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const goalAmount = getFieldValue('goal_amount');
                                        if (!value || !goalAmount || value <= goalAmount) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('El aporte inicial no puede ser mayor a la meta'));
                                    },
                                })
                            ]}
                        >
                            <InputNumber 
                                className="!w-full" 
                                placeholder="Aporte inicial" 
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                precision={2}
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            className="flex-1" 
                            label="Fecha meta" 
                            name={'date'} 
                            rules={[
                                { required: true, message: 'La fecha de la meta es requerida' },
                                () => ({
                                    validator(_, value) {
                                        if (!value || dayjs(value).isAfter(dayjs(), 'day')) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('La fecha debe ser futura'));
                                    },
                                })
                            ]}
                        >
                            <DatePicker 
                                className="!w-full"
                                placeholder="Seleccionar fecha"
                                format="DD/MM/YYYY"
                                disabledDate={(current) => current && current < dayjs().endOf('day')}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className="flex-1 mb-0">
                        <div className="flex gap-3">
                            <Button 
                                className="flex-1" 
                                onClick={handleClose}
                                disabled={loadingCreate}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                className="flex-1" 
                                type="primary" 
                                htmlType="submit" 
                                loading={loadingCreate}
                            >
                                Guardar Meta
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}