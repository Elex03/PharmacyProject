import FarmaNovaApi from "../PharmacyApi";

export const getOrdersDetailsData = async (id: number)=> {
  try {
    const response = await FarmaNovaApi.get(`/orders/details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data:", error);
    throw error;
  }
};

export const getOrdersDetailsGraph = async (id: number) => {
  try {
    const response = await FarmaNovaApi.get(`/orders/getOrderGraph/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders graph data:", error);
    throw error;
  }
};

interface DetallePedido {
  distribuidor: string;
  nombreMedicamento: string;
  fecha_expiracion: string;
  cantidadDeEmpaque: string | number;
  cantidadPorEmpaque: string | number;
  nroLote: string;
  total: number;
}

export const createNewOrder = async (detalles: DetallePedido[]) => {
  try {
    const response = await FarmaNovaApi.post('/orders/registerOrder', detalles, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};