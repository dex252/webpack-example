using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace HealbeWEB.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum MessageStatus
    {
        undefined = 0,
        ok =200,
        error=500
    }
}
