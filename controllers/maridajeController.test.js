
const { eliminarMaridaje } = require("./maridajeController");
const Maridaje = require("../models/maridaje");

/*
 * SIMULACIÓN DE BASE DE DATOS (MOCK)
 * Simulamos la base de datos para no borrar datos reales
 * durante la ejecución de las pruebas.
 */

jest.mock("../models/maridaje");

describe("Pruebas unitarias para eliminarMaridaje", () => {

  /*
   * CASO 1: ELIMINACIÓN EXITOSA (CAMINO FELIZ)
   * Verificamos que, cuando el maridaje existe:
   * - Se elimine correctamente.
   * - Responda con código 200 (éxito).
   * - Devuelva un mensaje confirmando la eliminación.
   */

  test("Debería eliminar un maridaje existente y devolver estado 200", async () => {

    // Definimos un ID simulado para la petición.
    const req = {
      params: { id: "12345" }
    };

    // Simulamos la respuesta de Express.
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Simulamos que la base de datos encontró el maridaje y lo borró.
    Maridaje.findByIdAndDelete.mockResolvedValue({
      _id: "12345"
    });

    // Ejecutamos la función del controlador.
    await eliminarMaridaje(req, res);

    // Verificamos que responda con código 200 (éxito).
    expect(res.status).toHaveBeenCalledWith(200);

    // Verificamos el mensaje de confirmación.
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Maridaje eliminado"
    });

  });

  /*
   * CASO 2: ERROR CUANDO EL ID NO EXISTE (CASO DE BORDE)
   * Verificamos qué sucede cuando se intenta eliminar
   * un maridaje que no existe en la base de datos.
   * - La base de datos devuelve null.
   * - El controlador identifica que no existe.
   * - Responde con código 404 (no encontrado).
   */

  test("Debería devolver error 404 si el maridaje no existe", async () => {

    // Definimos un ID de prueba que no existe.
    const req = {
      params: { id: "ID_INEXISTENTE" }
    };

    // Simulamos la respuesta de Express.
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Simulamos que la base de datos NO encontró nada (devuelve null).
    Maridaje.findByIdAndDelete.mockResolvedValue(null);

    // Ejecutamos la función del controlador.
    await eliminarMaridaje(req, res);

    // Verificamos que responda con código 404 (no encontrado).
    expect(res.status).toHaveBeenCalledWith(404);

    // Verificamos el mensaje de error correspondiente.
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Maridaje no encontrado"
    });

  });

});
