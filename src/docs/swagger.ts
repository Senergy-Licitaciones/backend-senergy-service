import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
import path from 'path'
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'Senergy - Licitaciones',
    version: '1.0.0',
    description: 'API para la Gestión de Licitaciones de Suministros de Energía Eléctrica'
  },
  servers: [{
    url: 'https://senergy-backend.herokuapp.com'
  }, {
    url: 'http://localhost:4000'
  }],
  externalDocs: {
    url: 'https://senergy-frontend.vercel.app/',
    description: 'Plataforma de Cliente'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      admin: {
        type: 'object',
        required: ['name', 'correo', 'password', 'role'],
        properties: {
          name: {
            type: 'string'
          },
          correo: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          role: {
            type: 'string',
            enum: ['jefe | empleado']
          }
        }
      },
      responseAdmin: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          correo: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          role: {
            type: 'string',
            enum: ['jefe | empleado']
          },
          createdAt: {
            type: 'string'
          },
          updatedAt: {
            type: 'string'
          }
        }
      },
      responseMessage: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      responseCalculo: {
        type: 'object',
        properties: {
          ganador: {
            type: 'string'
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                empresa: {
                  type: 'string'
                },
                total: {
                  type: 'number'
                },
                monomico: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      fecha: {
                        type: 'string'
                      },
                      value: {
                        type: 'number'
                      }
                    }
                  }
                },
                potencia: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      fecha: {
                        type: 'string'
                      },
                      value: {
                        type: 'number'
                      }
                    }
                  }
                },
                energiaHp: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      fecha: {
                        type: 'string'
                      },
                      value: {
                        type: 'number'
                      }
                    }
                  }
                },
                energiaHfp: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      fecha: {
                        type: 'string'
                      },
                      value: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          proyeccionParametros: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                values: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      fecha: {
                        type: 'string'
                      },
                      value: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      parametroName: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          },
          name: {
            type: 'string'
          }
        }
      }
    }
  }

}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [`${path.join(__dirname, '../apiServices/*/route.ts')}`]
}
export default swaggerJSDoc(swaggerOptions)
