
export const validation = (schema)=>{
  return async (req,res,next)=>{
    const errorMessages = []
    let filterdata = {}
    if(req.file){
      filterdata = {image:req.file,...req.body, ...req.params, ...req.query}
      console.log(filterdata)
      }
      else if(req.files){
       filterdata = {...req.files,...req.body, ...req.params, ...req.query}
      } else{
       filterdata = {...req.body, ...req.params, ...req.query}
      }
    const {error} = schema.validate(filterdata, {abortEarly: false})
    if(error){
      error.details.forEach(err=>{

        const key = err.context.key 
        errorMessages.push({[key]:err.message})
      }
      )
      return res.status(400).json({message:"validation error", error: errorMessages})
    }
    next();
  }
} 