'use client'
import { Button, Drawer, Form, Input, InputNumber, message, Select } from "antd"
import { useCategoriesPageContext } from "./contexts/CategoriesPageContext";
import { colorPaletteCategoryData, emojiCategoryData } from "@/src/utils/data/categoryData";

type Props = {}

export default function FormCategory({

}: Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const { isOpenForm, closeForm, createOrUpdateCategory, loadingSaveCategory, listCategory } = useCategoriesPageContext();
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        createOrUpdateCategory(values, () => {
            closeForm();
            listCategory();
            messageApi.success('Categoria creada!');
        });
    }

    return (
        <>
            { contextHolder }
            <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={closeForm}
                open={isOpenForm}
                width={400}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                // initialValues={{ requiredMarkValue: requiredMark }}
                // onValuesChange={onRequiredTypeChange}
                // requiredMark={CustomizeRequiredMark}
                >
                    <Form.Item label="Nombre" name={'name'} required>
                        <Input placeholder="Nombre categoria..." />
                    </Form.Item>
                    <div className="relative flex gap-4 justify-between">
                        <Form.Item label="Tipo" required name={'type'} >
                            <Select
                                placeholder='Seleccionar tipo'
                                options={[
                                    { label: 'Ingresos', value: 'income' },
                                    { label: 'Gastos', value: 'expense' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item className="flex-1" label="Presupuesto" name={'budget'}>
                            <InputNumber className="!w-full" placeholder="Presupuesto" />
                        </Form.Item>
                    </div>
                    <div className="relative flex gap-4">
                        <Form.Item label="Color" className="flex-1" required name={'color'} >
                            <Select
                                placeholder="Seleccionar color"
                                className="!w-full"
                                options={colorPaletteCategoryData.map(color => ({
                                    label: (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    backgroundColor: color.hex,
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                            {color.name}
                                        </div>
                                    ),
                                    value: color.hex,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item label="Emoji" className="flex-1" required name={'icon'}>
                            <Select
                                className="!w-full"
                                placeholder='Seleccionar emoji'
                                options={emojiCategoryData.map(emoji => {
                                    return { label: emoji.emoji, value: emoji.id }
                                })}

                                onChange={(_, option: any) => {
                                    form.setFieldsValue({ icon: option?.label });
                                }}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className="flex-1" >
                        <Button className="!w-full" type="primary" htmlType="submit" loading={loadingSaveCategory}>Guardar</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}