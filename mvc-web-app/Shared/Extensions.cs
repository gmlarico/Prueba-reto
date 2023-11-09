using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Runtime.CompilerServices;
using System.Text;

namespace demo_0.Shared
{
    public static class Extensions
    {

        public static HttpContent CreateAsHttpContent(this object content)
        {

            var json = JsonConvert.SerializeObject(content, IsoDateFormatSettings);
            return new StringContent(json,Encoding.UTF8,"application/json");
        
        }   

        private static JsonSerializerSettings IsoDateFormatSettings
        {
            get
            {
                return new JsonSerializerSettings
                {
                    DateFormatHandling = DateFormatHandling.IsoDateFormat,
                    NullValueHandling = NullValueHandling.Ignore,
                    ContractResolver = new CamelCasePropertyNamesContractResolver()

                };
                
                
            }
        }

    }
}
