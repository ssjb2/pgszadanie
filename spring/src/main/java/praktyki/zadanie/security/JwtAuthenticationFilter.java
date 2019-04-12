package praktyki.zadanie.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import praktyki.zadanie.entity.User;
import praktyki.zadanie.services.CustomUserDetailsService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static praktyki.zadanie.security.SecurityConstants.HEADER_STRING;
import static praktyki.zadanie.security.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJWTFromRequest(httpServletRequest);

            if(StringUtils.hasText(jwt)&&tokenProvider.validateToken(jwt)){
                Long userId = tokenProvider.getUserIdFromJWT(jwt);
                User userDetails = customUserDetailsService.loadUserById(userId);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, Collections.emptyList());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            logger.error("Could not set authentication in security conext", ex);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getJWTFromRequest(HttpServletRequest httpServletRequest){
        String bearerToken = httpServletRequest.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToken)&& bearerToken.startsWith(TOKEN_PREFIX)){
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}

