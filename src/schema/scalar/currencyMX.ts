import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { Kind } from "graphql/language";
import formatCurrency from "format-currency";

const generateCurrency = (value: string) => {

  let opts = { format: "%s%v", code: "MXN", symbol: "$" };
  const currencyInCents = parseInt(value, 10);
  
  return formatCurrency(currencyInCents / 100, opts);
}

const generateCents = (value: string) => {
  const digits = value.replace("$", "").replace(",", "");
  const number = parseFloat(digits);
  return number * 100;
}

const config: Readonly<GraphQLScalarTypeConfig<any, any>> = {
  name: "MXCurrency",
  description: "A currency string, such as $21.25",
  serialize: generateCurrency,
  parseValue (value: string) {
    return generateCents(value);
  },
  parseLiteral(ast){
    if (ast.kind === Kind.STRING) {
      return generateCents(ast.value);
    }
    throw new TypeError(
      `Currency cannot represent an invalid currency-string ${ast}.`
    );
  } 
};

export default new GraphQLScalarType(config);
