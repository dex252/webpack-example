using HealbeWEB.Enums;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HealbeWEB.Models
{
    public sealed class JsonResponse<T> : ContentResult
        where T: class
    {
        public JsonResponse(MessageStatus status, string message, T content = null)
        {
            var response = new
            {
                Status = status,
                Message = message,
                Data = content
            };

            Content = JsonConvert.SerializeObject(response);
            ContentType = "application/json";
        }
    }
}
