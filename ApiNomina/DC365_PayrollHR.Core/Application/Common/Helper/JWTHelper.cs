/// <summary>
/// Helper para JWT.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase auxiliar para JWT.
    /// </summary>
    public static class JWTHelper
    {
        /// <summary>
        /// Genera.
        /// </summary>
        /// <param name="_user">Parametro _user.</param>
        /// <param name="_configuration">Parametro _configuration.</param>
        /// <param name="_companyDefault">Parametro _companyDefault.</param>
        /// <param name="_isLicenseValid">Parametro _isLicenseValid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static string GenerateJwtToken(User _user, AppSettings _configuration, string _companyDefault, bool _isLicenseValid)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.Secret);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, _user.Alias),
                new Claim(ClaimTypes.Email, _user.Email),
                new Claim(ClaimTypes.Actor, _user.ElevationType.ToString()),
                new Claim(ClaimTypes.PostalCode, _companyDefault), //Compañía por defecto
                new Claim(ClaimTypes.SerialNumber, _isLicenseValid.ToString()), //Compañía por defecto
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
