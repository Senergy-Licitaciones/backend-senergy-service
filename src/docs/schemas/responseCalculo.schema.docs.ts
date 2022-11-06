export const ResponseCalculoSchema = {
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
}
