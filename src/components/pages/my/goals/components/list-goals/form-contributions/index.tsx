import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Select } from "antd";
import dayjs from 'dayjs';
import { useGoalPageContext } from "../../../contexts/GoalPageContext";

export default function FormContributions() {
    const { 
        isOpenContributionForm, 
        setOpenContributionForm, 
        list: listGoals, 
        createContribution,
        loadingContribution,
        selectedGoal,
        setSelectedGoal,
    } = useGoalPageContext();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        // Formatear la fecha antes de enviar
        const formattedValues = {
            ...values,
            date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null,
            goal_id: selectedGoal?.id
        };
        
        createContribution(formattedValues, () => {
            form.resetFields();
            setOpenContributionForm(false);
            listGoals();
            messageApi.success('Contribución creada exitosamente!');
        });
    };

    const handleClose = () => {
        form.resetFields();
        setSelectedGoal(null);
        setOpenContributionForm(false);
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title={selectedGoal ? `Contribución a la meta ${selectedGoal?.icon} ${selectedGoal?.name}` : 'Contribución a la meta'}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={handleClose}
                open={isOpenContributionForm}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <div className="relative flex gap-4">
                        <Form.Item 
                            className="flex-1" 
                            label="Monto" 
                            name={'amount'} 
                            rules={[
                                { required: true, message: 'El monto es requerido' },
                                { type: 'number', min: 1, message: 'El monto debe ser mayor a 0' },
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
                            label="Fecha meta" 
                            name={'date'} 
                            rules={[
                                { required: true, message: 'La fecha de la meta es requerida' },
                            ]}
                        >
                            <DatePicker 
                                className="!w-full"
                                placeholder="Seleccionar fecha"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item 
                        label="Nota" 
                        name={'note'}
                        rules={[
                            { max: 200, message: 'La nota no puede exceder 200 caracteres' }
                        ]}
                    >
                        <Input.TextArea 
                            placeholder="Nota..." 
                            autoComplete="off" 
                            rows={3}
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>
                    
                    <Form.Item className="flex-1 mb-0">
                        <div className="flex gap-3">
                            <Button 
                                className="flex-1" 
                                onClick={handleClose}
                                disabled={loadingContribution}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                className="flex-1" 
                                type="primary" 
                                htmlType="submit" 
                                loading={loadingContribution}
                            >
                                Guardar Contribución
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}