package de.webapp.springboot.todos.user.domain;

public enum Role { //implements GrantedAuthority

    ROLE_USER,ROLE_ADMIN;

//    @Override
//    public String getAuthority() {
//        return this.name();
//    }
}
